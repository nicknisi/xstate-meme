import { createMachine } from 'xstate';

export const machine = createMachine({
	id: 'lightMachine',
	initial: 'red',
	states: {
		red: {
			on: {
				switch: {
					target: 'green',
				},
			},
		},
		green: {
			on: {
				switch: {
					target: 'yellow',
				},
			},
		},
		yellow: {
			on: {
				switch: {
					target: 'red',
				},
			},
		},
	},
	types: { events: {} as { type: 'switch' } },
});
