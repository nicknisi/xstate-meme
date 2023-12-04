import { sleep } from './utils.js';

const API_BASE_URL = 'https://api.imgflip.com';
const USERNAME = import.meta.env.VITE_MEME_USERNAME;
const PASSWORD = import.meta.env.VITE_MEME_PASSWORD;

export interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
  captions: number;
}

/**
 * Fetches memes from the Imgflip API
 * @param delay - Delay in milliseconds, for dramatic effect
 */
export async function fetchMemes(delay = 0): Promise<Meme[]> {
  const response = await fetch(`${API_BASE_URL}/get_memes`);
  const json = await response.json();
  if (delay) {
    await sleep(delay);
  }
  return json.data.memes;
}

/**
 * Captions a meme from the Imgflip API
 * @param id - The meme ID
 * @param captions - The captions to add to the meme
 * @param delay - Delay in milliseconds, for dramatic effect
 */
export async function captionMeme(id: string, captions: string[], delay = 0): Promise<string> {
  const body = new FormData();
  body.append('template_id', id);
  body.append('username', USERNAME);
  body.append('password', PASSWORD);

  captions.forEach((text, i) => {
    body.append(`boxes[${i}][text]`, text.toUpperCase());
    body.append(`boxes[${i}][color]`, '#ffffff');
    body.append(`boxes[${i}][outline_color]`, '#000000');
  });

  const response = await fetch(`${API_BASE_URL}/caption_image`, {
    method: 'POST',
    body,
  });
  const json = await response.json();
  if (delay) {
    await sleep(delay);
  }
  return json.data.url;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }>;
}

/**
 * Given the name of a meme, use OpenAI to generate a clue about what the meme is.
 * @param name - The name of the meme
 */
export async function getClue(name: string, delay = 0): Promise<string> {
  const systemMessage =
    'You are a clue generator for a guessing game. Given the name of a popular meme, come up with a fun yet difficult to guess clue about the meme in the form of either a haiku or a limerick. Respond with only the text. Do not label it as a haiku or limerick.';

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      stream: false,
      messages: [
        {
          content: systemMessage,
          role: 'system',
        },
        {
          content: name,
          role: 'user',
        },
      ],
      model: 'gpt-4-1106-preview',
      temperature: 0.8,
      max_tokens: 1000,
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate clue');
  }

  if (delay) {
    await sleep(delay);
  }

  const json = (await response.json()) as OpenAIResponse;
  return json.choices?.[0]?.message?.content ?? 'Clue not found.';
}
