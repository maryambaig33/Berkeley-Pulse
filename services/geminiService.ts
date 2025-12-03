import { GoogleGenAI } from "@google/genai";
import { AiUpdateResponse, GroundingChunk } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// We use the pro model for complex grounding tasks
const MODEL_NAME = 'gemini-3-pro-preview';

export const getLatestUpdates = async (topic: string): Promise<AiUpdateResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Find the very latest news, community reactions, and updates regarding: ${topic}. Summarize the current status and any new developments since December 1, 2025.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No updates found.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [];

    return { text, groundingChunks };
  } catch (error) {
    console.error("Error fetching updates:", error);
    return { text: "Failed to fetch updates. Please try again later." };
  }
};

export const findAlternatives = async (locationName: string, lat: number, lng: number): Promise<AiUpdateResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Flash is often sufficient for maps, but grounding works best with Pro for complex queries
      contents: `I am at ${locationName}. Find me 3 other high-rated used bookstores nearby that are currently open. Provide a brief reason to visit each.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        }
      },
    });

    const text = response.text || "No alternatives found.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [];

    return { text, groundingChunks };
  } catch (error) {
    console.error("Error finding alternatives:", error);
    return { text: "Failed to find alternatives." };
  }
};

export const analyzeSentiment = async (articleContent: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the tone and likely community impact of this article text. Be concise (max 100 words). \n\nArticle: ${articleContent.substring(0, 2000)}`,
    });
    return response.text || "Could not analyze sentiment.";
  } catch (error) {
    return "Error analyzing sentiment.";
  }
};