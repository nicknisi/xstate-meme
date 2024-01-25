import type { Meta, StoryObj } from '@storybook/react';
import RenderMachine from './storybook/RenderMachine.js';
import { createMachine } from 'xstate';

const meta: Meta = {
	title: 'Examples',
};

export default meta;

type Story = StoryObj<typeof RenderMachine>;

type LightEvent = { type: 'SWITCH' };

const lightMachine = createMachine({
	id: 'light',
	types: {} as {
		context: undefined;
		events: LightEvent;
	},
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

export const LightMachine: Story = {
	render: () => <RenderMachine machine={lightMachine} />,
};

const promiseMachine = createMachine({
	id: 'Promise',
	initial: 'pending',
	states: {
		pending: {
			on: {
				RESOLVE: 'fulfilled',
				REJECT: 'rejected',
			},
		},
		fulfilled: { type: 'final' },
		rejected: { type: 'final' },
	},
});

export const PromiseMachine: Story = {
	render: () => <RenderMachine machine={promiseMachine} />,
};
