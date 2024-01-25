import { assign, createMachine, fromPromise } from 'xstate';
import { CaptionRequest, Meme, captionMeme, fetchMemes, getCaptions, getClue } from './api.js';

export interface MemeMachineContext {
	memes: Meme[];
	selectedMeme: Meme | null;
	captions: string[];
	clue: string | null;
	generatedMemeUrl: string | null;
	prompt: string | null;
}

export type MemeMachineEvent =
	| { type: 'ADD_CAPTION' | 'ADD_PROMPT'; value: string }
	| { type: 'START' | 'NEXT' | 'ENTER_PROMPT' | 'ENTER_CAPTIONS' | 'RETRY' };

export const memeMachine = createMachine(
	{
		types: {} as {
			context: MemeMachineContext;
			events: MemeMachineEvent;
		},
		id: 'memeMachine',
		context: {
			memes: [],
			selectedMeme: null,
			captions: [],
			clue: null,
			generatedMemeUrl: null,
			prompt: null,
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
				always: 'getClue',
			},
			getClue: {
				tags: ['loading'],
				invoke: {
					id: 'getClue',
					src: 'getClue',
					input: ({ context: { selectedMeme } }) => ({ selectedMeme }),
					onDone: {
						target: 'showClue',
						actions: assign({
							clue: ({ event }) => event.output,
						}),
					},
				},
			},
			showClue: {
				on: {
					RETRY: 'selectMeme',
					ENTER_CAPTIONS: {
						target: 'enterCaptions',
					},
					ENTER_PROMPT: { target: 'enterPrompt' },
				},
			},
			enterPrompt: {
				initial: 'initial',
				onDone: {
					target: 'generateMeme',
				},
				states: {
					initial: {
						on: {
							ADD_PROMPT: {
								actions: assign({
									prompt: ({ event }) => event.value,
								}),
								target: 'generateCaptions',
							},
						},
					},
					generateCaptions: {
						tags: ['loading'],
						invoke: {
							id: 'generateCaptions',
							src: 'generateCaptions',
							input: ({ context: { selectedMeme, prompt, clue } }) =>
								({
									name: selectedMeme?.name ?? '',
									fields: selectedMeme?.box_count ?? 0,
									prompt: prompt ?? '',
									description: clue ?? '',
								}) satisfies CaptionRequest,
							onDone: {
								target: 'done',
								actions: assign({
									captions: ({ event }) => event.output,
								}),
							},
						},
					},
					done: { type: 'final' },
				},
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
			fetchMemes: fromPromise(() => fetchMemes(2000)),
			generateMeme: fromPromise(
				async ({ input: { selectedMeme, captions } }: { input: { selectedMeme: Meme; captions: string[] } }) =>
					captionMeme(selectedMeme!.id, captions, 2000),
			),
			generateCaptions: fromPromise(
				({
					input: { name, fields, prompt, description },
				}: {
					input: { description: string; name: string; fields: number; prompt: string; clue: string };
				}) =>
					getCaptions({
						name,
						description,
						fields,
						prompt,
					}),
			),
			getClue: fromPromise(({ input }: { input: { selectedMeme: Meme } }) => getClue(input.selectedMeme.name, 2000)),
		},
	},
);
