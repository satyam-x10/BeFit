import { Doctors } from "@/constants";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

const scrapeDoctors = async (query) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Go to Bing Maps and search for doctors near New Delhi
  await page.goto(`https://www.bing.com/maps?q=${query}`, {
    waitUntil: "networkidle2",
  });

  // Wait for the results container to load
  await page.waitForSelector("div.b_imagePair.tall_m", { visible: true });

  // Scroll the page to load more results
  async function autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= document.body.scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });
  }

  let doctors = [];

  while (doctors.length < 20) {
    await autoScroll(page);

    // Scrape details of doctors
    let newDoctors = await page.evaluate(() => {
      let results = [];
      let items = document.querySelectorAll("div.b_imagePair.tall_m");

      items.forEach((item) => {
        let name = item.querySelector(".b_factrow")
          ? item.querySelector(".b_factrow").innerText
          : null;
        let address = item.querySelector(".b_address")
          ? item.querySelector(".b_address").innerText
          : null;
        let phone = item.querySelector(".b_factrow:last-child")
          ? item.querySelector(".b_factrow:last-child").innerText
          : null;
        let hours = item.querySelector(".opHours")
          ? item.querySelector(".opHours").innerText
          : null;

        // Find the image URL
        let imageUrl = item.querySelector("img")
          ? item.querySelector("img").src
          : null;

        results.push({
          name,
          address,
          phone,
          hours,
          imageUrl, // Add image URL to the result
        });
      });

      return results;
    });

    // Add new doctors to the list
    doctors = [...doctors, ...newDoctors];
  }

  await browser.close();

  // Limit to 20 results
  doctors = doctors.slice(0, 20);

  return doctors;
};

export async function POST(request) {
  const { region, credentials } = await request.json();
  try {
    console.log("region", region);
    console.log("credentials", credentials);

    const search = `${credentials} near ${region}`;
    const data = await scrapeDoctors(search);
    // Return the scraped data
    return NextResponse.json({ success: true, scrapedData: data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Scraping failed" },
      { status: 500 }
    );
  }
}
