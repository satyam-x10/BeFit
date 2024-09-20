// Access your API key as an environment variable (see "Set up your API key" above)
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyDpjZeYXK_uh74AH4e2fwBOD0Q0X5WpvP4");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const askGemini = async (inputText) => {
  try {
    const result = await model.generateContent(
      `Pretend to be a doctor and reply. If the below question isnt related to medical field please refrain from answering in any case,  only act as a doctor .Please and thanks. ${inputText} `
    );
    const response = await result.response;
    let text = response.text();
    text = text.replace(/\*\*|\*|\d+\./g, ""); // Remove markdown and numbered list markers

    // Convert Markdown to HTML

    return text;
  } catch (error) {
    return "Some Error happened";
  }
};
