import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize the Groq client. Requires GROQ_API_KEY environment variable.
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'Missing GROQ_API_KEY environment variable.' }, { status: 500 });
    }

    const { text } = await req.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Valid text input is required.' }, { status: 400 });
    }

    const systemPrompt = "You are Artha AI. Analyze the input. If it's a word, provide its phonetic, meaning, Hindi translation, Marathi translation, and usage. If it's a sentence, explain its grammatical structure and provide a Hindi/Marathi translation. Output ONLY valid JSON in this format: { \"phonetic\": \"\", \"meaning\": \"\", \"hindi\": \"\", \"marathi\": \"\", \"explanation\": \"\", \"type\": \"word|sentence\" }.";

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: text }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      response_format: { type: 'json_object' }
    });

    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error('No response from Groq API');
    }

    const result = JSON.parse(responseContent);
    return NextResponse.json(result);

  } catch (error: unknown) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred during translation.' },
      { status: 500 }
    );
  }
}
