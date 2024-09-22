// @ts-ignore
// @ts-nocheck

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const askGemini = async (inputText, type) => {
  try {
    let prompt = "";
    if (type === "docbot") {
      prompt = `Pretend to be a doctor and reply. If the below question isn't related to medical field, please refrain from answering in any case. Only act as a doctor. Please and thanks.`;
    } else if (type === "symptoms") {
      prompt =
        "i am gonna provide you with few symptomps. You have to provide me with possible disease and advices.. but you must provide them in a proper json format without any markdown.. just an object , nothing else strictly...  if the input provided is not medical field related , please refrain from answering in any case. As an example , if my input was cold , sneeze ur reply should be a javascript object strictly..  for example { disease: [fever, cough,  rashes], advices:[take rest ,  drinnk water ] } do not return in any othere format strictly.... here is the symptomp:";
    }
    const result = await model.generateContent(`${prompt} ${inputText}`);
    const response = await result.response;
    let text = response.text();
    text = text.replace(/\*\*|\*|\d+\./g, ""); // Remove markdown and numbered list markers

    return text;
  } catch (error) {
    return "Some Error happened";
  }
};
