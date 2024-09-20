// api/facilities/route.js

import puppeteer from "puppeteer";

const fetchNearbyFacilitiesFromGooglePlaces = async (place, facility) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const query = `${facility} near ${place}`;
  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

  try {
    await page.goto(googleUrl, { waitUntil: "networkidle2" });

    // Wait for the results to load
    await page.waitForSelector("div[jsname='SaftMd']");

    const results = await page.evaluate(() => {
      const items = Array.from(
        document.querySelectorAll("div[jsname='SaftMd']")
      );
      return items.map((item) => {
        const name = item.querySelector("span.OSrXXb")
          ? item.querySelector("span.OSrXXb").innerText
          : "";
        const rating = item.querySelector(".Y0A0hc span")
          ? item.querySelector(".Y0A0hc span").innerText
          : "";
        const reviews = item.querySelector(".RDApEe")
          ? item.querySelector(".RDApEe").innerText
          : "";
        const type = item.querySelector("div.rllt__details div")
          ? item.querySelector("div.rllt__details div").innerText
          : "";
        const address = item.querySelector(
          "div.rllt__details div:nth-of-type(2)"
        )
          ? item.querySelector("div.rllt__details div:nth-of-type(2)").innerText
          : "";
        const availability = item.querySelector(
          "div.rllt__details div:nth-of-type(3)"
        )
          ? item.querySelector("div.rllt__details div:nth-of-type(3)").innerText
          : "";
        const contact = item.querySelector("div.rllt__details a")
          ? item.querySelector("div.rllt__details a").innerText
          : "";
        const url = item.querySelector("a.vwVdIc")
          ? `https://www.google.com${item.querySelector("a.vwVdIc").getAttribute("href")}`
          : "";

        return {
          name,
          rating,
          reviews,
          type,
          address,
          availability,
          contact,
          url,
        };
      });
    });

    return results.filter((result) => result.name); // Filter out any empty results
  } catch (error) {
    console.error("Error fetching nearby facilities:", error);
    return [];
  } finally {
    await browser.close();
  }
};

export async function handler(req, res) {
  console.log("Request received");

  const { place, facility } = req.query;

  if (!place || !facility) {
    return res.status(400).json({ error: "Place and facility are required" });
  }

  try {
    const results = await fetchNearbyFacilitiesFromGooglePlaces(
      place,
      facility
    );
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
