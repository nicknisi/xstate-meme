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

export async function fetchMemes(): Promise<Meme[]> {
  const response = await fetch(`${API_BASE_URL}/get_memes`);
  const json = await response.json();
  return json.data.memes;
}

export async function captionMeme(id: string, captions: string[]): Promise<string> {
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
  return json.data.url;
}
