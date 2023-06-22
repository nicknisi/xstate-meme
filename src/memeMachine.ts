import { assign, createMachine } from 'xstate';
import { Meme, captionMeme, fetchMemes, getClue } from './api';

interface MemeMachineContext {
  memes: Meme[];
  selectedMeme: Meme | null;
  captions: string[];
  clue: string | null;
  generatedMemeUrl: string | null;
}

export type MemeMachineEvent = { type: 'ADD_CAPTION'; value: string } | { type: 'NEXT' };

export const memeMachine = createMachine<MemeMachineContext, MemeMachineEvent>(
  {
    id: 'memeMachine',
    predictableActionArguments: true,
    preserveActionOrder: true,
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
        // always: 'loadMemes',
        on: { NEXT: 'loadMemes' },
      },
      loadMemes: {
        tags: ['loading'],
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
                target: 'enterCaption',
                cond: 'needsMoreCaptions',
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
        tags: ['loading'],
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
    },
    services: {
      fetchMemes: () => () => fetchMemes(2000),
      generateMeme:
        ({ selectedMeme, captions }) =>
        () =>
          captionMeme(selectedMeme!.id, captions, 2000),
      getClue:
        ({ selectedMeme }) =>
        () =>
          getClue(selectedMeme!.name, 2000),
    },
  },
);
