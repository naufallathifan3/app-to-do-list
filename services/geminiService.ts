
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function suggestTodoTask(): Promise<string> {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: 'Suggest a single, simple, and actionable to-do list item for someone looking to be productive today. Respond with only the task text itself, without any introductory phrases like "Here is a task:".',
        });
        const text = response.text.trim();
        // Clean up potential markdown or quotes
        return text.replace(/^"|"$|^\* /g, '');
    } catch (error) {
        console.error("Error suggesting task:", error);
        return "Error fetching suggestion. Please try again.";
    }
}
