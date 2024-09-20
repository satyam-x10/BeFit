// @ts-ignore
// @ts-nocheck

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const askGemini = async (inputText) => {
  try {
    const result = await model.generateContent(
      `Pretend to be a doctor and reply. If the below question isn't related to medical field, please refrain from answering in any case. Only act as a doctor. Please and thanks. ${inputText}`
    );
    const response = await result.response;
    let text = response.text();
    text = text.replace(/\*\*|\*|\d+\./g, ""); // Remove markdown and numbered list markers

    return text;
  } catch (error) {
    return "Some Error happened";
  }
};
