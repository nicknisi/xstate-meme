import { assign, createMachine } from 'xstate';
import { Meme, captionMeme, fetchMemes } from './api';

interface MemeMachineContext {
  memes: Meme[];
  selectedMeme: Meme | null;
  captions: string[];
  generatedMemeUrl: string | null;
}

export type MemeMachineEvent = { type: 'ADD_CAPTION'; value: string };

export const memeMachine = createMachine<MemeMachineContext, MemeMachineEvent>(
  {
    id: 'memeMachine',
    predictableActionArguments: true,
    preserveActionOrder: true,
    context: {
      memes: [],
      selectedMeme: null,
      captions: [],
      generatedMemeUrl: null,
    },
    initial: 'initial',
    states: {
      initial: {
        always: 'loadMemes',
      },
      loadMemes: {
        invoke: {
          id: 'fetchMemes',
          src: 'fetchMemes',
          onDone: {
            target: 'selectMeme',
            actions: assign({
              memes: (_, event) => event.data,
            }),
          },
        },
      },
      selectMeme: {
        entry: assign({
          selectedMeme: ({ memes }) => memes[Math.floor(Math.random() * memes.length)],
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
                target: 'done',
                cond: 'hasEnoughCaptions',
              },
              {
                target: 'enterCaption',
                cond: 'needsMoreCaptions',
              },
            ],
          },
          enterCaption: {
            on: {
              ADD_CAPTION: {
                actions: assign({
                  captions: ({ captions }, event) => captions.concat(event.value ?? 'DEFAULT'),
                }),
                target: 'entering',
              },
            },
          },
          done: { type: 'final' },
        },
      },
      generateMeme: {
        invoke: {
          id: 'generateMeme',
          src: 'generateMeme',
          onDone: {
            target: 'done',
            actions: assign({
              generatedMemeUrl: (_, event) => event.data,
            }),
          },
        },
      },
      done: { type: 'final' },
    },
  },
  {
    guards: {
      needsMoreCaptions: ({ selectedMeme, captions }) => selectedMeme!.box_count > captions.length,
      hasEnoughCaptions: ({ selectedMeme, captions }) => selectedMeme!.box_count === captions.length,
    },
    services: {
      fetchMemes: () => fetchMemes,
      generateMeme:
        ({ selectedMeme, captions }) =>
        () =>
          captionMeme(selectedMeme!.id, captions),
    },
  },
);
