import { sleep } from './utils';

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
