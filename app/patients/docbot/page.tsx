"use client";

import { askGemini } from "@/lib/actions/ai/gemini";
import React, { useState } from "react";

// This is a placeholder function. In a real application, you would
// need to integrate with a proper medical AI service.
const askMedicalAI = async (query) => {
  const reply = await askGemini(query);
  return reply;
};

const MedicalChatBot = () => {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText("");

    try {
      const botReply = await askMedicalAI(inputText);
      const botMessage = {
        id: Date.now().toString(),
        text: botReply,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now().toString(),
        text: "An error occurred. Please try again or consult a healthcare professional.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-gray-200">
      <div className="bg-teal-800 p-4 text-white text-center">
        <h1 className="text-2xl font-bold">Medical Assistant</h1>
      </div>

      <div
        className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg m-4"
        role="alert"
      >
        <strong className="font-bold">Important Disclaimer:</strong>
        <p className="block sm:inline">
          {" "}
          This AI assistant provides general information only and is not a
          substitute for professional medical advice, diagnosis, or treatment.
          Always seek the advice of your physician or other qualified health
          provider with any questions you may have regarding a medical
          condition.
        </p>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg max-w-[80%] ${
                message.sender === "user"
                  ? "bg-teal-700 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              <p className="break-words">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 p-4 bg-gray-900">
        <div className="flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            className="flex-grow bg-gray-800 text-white border border-gray-700 rounded-l-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask a medical question..."
          />
          <button
            className="bg-teal-700 text-white rounded-r-full py-2 px-6 hover:bg-teal-600 transition-colors duration-200"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicalChatBot;
