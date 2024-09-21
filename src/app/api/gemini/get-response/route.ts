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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const inputData = (await req.json()) as {
    input: string,
    history: { role: "user" | "model", parts: { text: string }[] }[]
  };

  const chat = model.startChat({ history: inputData.history });
  const result = await chat.sendMessage(inputData.input);
  const response = result.response.text();
  const newHistory = await chat.getHistory()

  return new NextResponse(
    JSON.stringify({
      response: response,
      history: newHistory
    }),
    { headers }
  );
}