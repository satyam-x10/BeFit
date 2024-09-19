"use client";

import { askGemini } from "@/lib/actions/ai/gemini";
import React, { useState } from "react";

const ChatBotScreen = () => {
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
      const botReply = await askGemini(inputText);
      const botMessage = {
        id: Date.now().toString(),
        text: botReply,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          text: "Something went wrong. Please try again.",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-400">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg mb-2 max-w-full md:max-w-lg lg:max-w-2xl ${
              message.sender === "user"
                ? "bg-green-400 self-end text-white"
                : "bg-gray-300 self-start text-black"
            }`}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center border-t border-gray-300 p-2 bg-white">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask something..."
        />
        <button
          className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-all duration-200 ease-in-out"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBotScreen;
