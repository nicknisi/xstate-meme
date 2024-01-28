import { assign, createMachine, fromPromise } from 'xstate';
import { Meme, captionMeme, fetchMemes } from '../api.js';

export interface MemeMachineContext {
	memes: Meme[];
	selectedMeme: Meme | null;
	captions: string[];
	generatedMemeUrl: string | null;
}

export type MemeMachineEvent = { type: 'ADD_CAPTION'; value: string } | { type: 'START' | 'NEXT' | 'ENTER_CAPTIONS' };

/**
 * The basic meme machine:
 * - Fetches memes
 * - Selects a meme at random
 * - Prompts for captions and captions the meme
 * - displays the meme
 */
export const basicMemeMachine = createMachine(
	{
		types: {} as {
			context: MemeMachineContext;
			events: MemeMachineEvent;
		},
		id: 'basicMemeMachine',
		context: {
			memes: [],
			selectedMeme: null,
			captions: [],
			generatedMemeUrl: null,
		},
		initial: 'initial',
		states: {
			initial: {
				on: { START: 'loadMemes' },
			},
			loadMemes: {
				tags: ['loading'],
				invoke: {
					id: 'fetchMemes',
					src: 'fetchMemes',
					onDone: {
						target: 'selectMeme',
						actions: assign({
							memes: ({ event }) => event.output,
						}),
					},
				},
			},
			selectMeme: {
				entry: assign({
					selectedMeme: ({ context: { memes } }) => memes[Math.floor(Math.random() * memes.length)] ?? null,
				}),
				always: 'enterCaptions',
			},
			enterCaptions: {
				initial: 'entering',
				onDone: {
					target: 'generateMeme',
				},
				states: {
					entering: {
						always: [
							{
								target: 'enterCaption',
								guard: 'needsMoreCaptions',
							},
							{
								target: 'done',
							},
						],
					},
					enterCaption: {
						on: {
							ADD_CAPTION: {
								actions: assign({
									captions: ({ context: { captions }, event }) => captions.concat(event.value ?? 'DEFAULT'),
								}),
								target: 'entering',
							},
						},
					},
					done: { type: 'final' },
				},
			},
			generateMeme: {
				tags: ['loading'],
				invoke: {
					id: 'generateMeme',
					src: 'generateMeme',
					input: ({ context: { selectedMeme, captions } }) => ({ selectedMeme, captions }),
					onDone: {
						target: 'done',
						actions: assign({
							generatedMemeUrl: ({ event }) => event.output,
						}),
					},
				},
			},
			done: { type: 'final' },
		},
	},
	{
		guards: {
			needsMoreCaptions: ({ context: { selectedMeme, captions } }) => selectedMeme!.box_count > captions.length,
		},
		actors: {
			fetchMemes: fromPromise(async () => {
				const API_BASE_URL = 'https://api.imgflip.com';
				const response = await fetch(`${API_BASE_URL}/get_memes`);
				const json = await response.json();
				return json.data.memes;
			}),
			generateMeme: fromPromise(
				async ({ input: { selectedMeme, captions } }: { input: { selectedMeme: Meme; captions: string[] } }) => {
					const API_BASE_URL = 'https://api.imgflip.com';
					const USERNAME = 'nicknisi';
					const PASSWORD = 'nkr3XMG!dbq_uxa8jwc';
					const body = new FormData();
					body.append('template_id', selectedMeme!.id);
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
				},
			),
		},
	},
);

export default basicMemeMachine;
