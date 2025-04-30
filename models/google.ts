import { GoogleGenAI } from "@google/genai";
import type { ModelCallerFunc } from "./factory";

export function getGoogleGenAICaller(
  googleModel: string,
  apiKey: string
): ModelCallerFunc {
  return async (prompt: string) => {
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const response = await ai.models.generateContent({
      model: googleModel,
      contents: prompt,
    });
    const text = response.text;
    if (!text) {
      throw new Error("No text response from Google GenAI");
    }
    return text;
  };
}
