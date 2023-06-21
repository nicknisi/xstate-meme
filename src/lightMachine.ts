import { createMachine } from 'xstate';

type LightEvent = { type: 'SWITCH' };

export const lightMachine = createMachine<undefined, LightEvent>({
  id: 'light',
  initial: 'red',
  states: {
    red: {
      on: { SWITCH: 'green' },
    },
    yellow: {
      on: { SWITCH: 'red' },
    },
    green: {
      on: { SWITCH: 'yellow' },
    },
  },
});
