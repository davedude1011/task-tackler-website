import { NextResponse } from 'next/server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY??"")
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
  const questionData = await req.text();

  const prompt = "YOU ARE AN AI DESIGNED TO TAKE IN QUESTION DATA AND RESPOND WITH THE ANSWER USING FORMATTING INFERED FROM THE DATA GIVEN. ONLY RESPOND WITH THE ANSWER. NO WHITESPACE, FORMATTING OR EXTRA TEXT. HERE IS YOUR DATA: " + questionData
  const result = await model.generateContent(prompt);
  const answer = result.response.text().replace(" \n", "").replace("\n", "")

  return new NextResponse(
    JSON.stringify({ answer: answer }),
    { headers }
  );
}