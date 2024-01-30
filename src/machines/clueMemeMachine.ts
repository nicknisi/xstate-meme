import { assign, createMachine, fromPromise } from 'xstate';
import { Meme, captionMeme, fetchMemes, getClue } from '../api.js';

export interface MemeMachineContext {
	memes: Meme[];
	selectedMeme: Meme | null;
	captions: string[];
	clue: string | null;
	generatedMemeUrl: string | null;
}

export type MemeMachineEvent = { type: 'ADD_CAPTION'; value: string } | { type: 'START' | 'NEXT' | 'ENTER_CAPTIONS' };

/**
 * This machine builds on the basic machine and adds a clue to it
 * - Fetches memes
 * - Selects a meme at random
 * - fetches a meme clue
 * - Prompts for captions and captions the meme
 * - displays the meme
 */
export const memeClueMachine = createMachine(
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
					ENTER_CAPTIONS: {
						target: 'enterCaptions',
					},
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
			fetchMemes: fromPromise(() => fetchMemes()),
			generateMeme: fromPromise(
				async ({ input: { selectedMeme, captions } }: { input: { selectedMeme: Meme; captions: string[] } }) =>
					captionMeme(selectedMeme!.id, captions),
			),
			getClue: fromPromise(({ input }: { input: { selectedMeme: Meme } }) => getClue(input.selectedMeme.name)),
		},
	},
);

export default memeClueMachine;
