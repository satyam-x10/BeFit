"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";
import { askGemini } from "@/lib/actions/ai/gemini";

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [geminiResult, setGeminiResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const diseases = ["Flu", "Common Cold", "Seasonal Allergy"];
    const remedies = [
      "Rest and hydration",
      "Over-the-counter medication",
      "Nasal irrigation",
    ];
    const advice =
      "If symptoms persist or worsen, please consult a healthcare professional.";
    setResult({ diseases, remedies, advice });

    // Call askGemini with the symptoms
    const geminiResponse = await askGemini(
      `I am having these symptoms: ${symptoms}. Help me.`
    );
    setGeminiResult(geminiResponse);

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:flex-1 p-8">
            <motion.h1
              className="text-3xl font-bold text-teal-600 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              AI-Powered Symptom Checker
            </motion.h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="symptoms"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Describe your symptoms
                </label>
                <textarea
                  id="symptoms"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                  rows="4"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="E.g., headache, fever, sore throat..."
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full bg-teal-600 text-white p-3 rounded-md hover:bg-teal-700 transition duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? "Analyzing..." : "Check Symptoms"}
              </motion.button>
            </form>

            <AnimatePresence>
              {showTip && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Be as specific as possible when describing your symptoms
                        for more accurate results.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                className="md:flex-1 bg-teal-50 p-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-teal-800 mb-4">
                  Analysis Results
                </h2>
                <div className="space-y-4 text-black">
                  <div>
                    <h3 className="text-lg font-semibold text-teal-700 mb-2">
                      Possible Conditions:
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {result.diseases.map((disease, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {disease}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-teal-700 mb-2">
                      Suggested Remedies:
                    </h3>
                    <ul className="list-disc list-inside space-y-1">
                      {result.remedies.map((remedy, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          {remedy}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700 font-medium">
                          Professional Advice
                        </p>
                        <p className="text-sm text-yellow-700 mt-1">
                          {result.advice}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Banner for Gemini result */}
      <AnimatePresence>
        {geminiResult && (
          <motion.div
            className="mt-6 bg-blue-100 border-l-4 border-blue-500 p-4 rounded"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700 font-medium">
                  DocBot Response
                </p>
                <p className="text-sm text-red-700 mt-1">{geminiResult}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SymptomChecker;
