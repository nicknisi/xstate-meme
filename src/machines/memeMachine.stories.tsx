import type { Meta, StoryObj } from '@storybook/react';
import RenderMachine from '../storybook/RenderMachine.js';
import { memeMachine } from './memeMachine';

const meta: Meta = {
	title: 'Meme Machine',
};

export default meta;

type Story = StoryObj<typeof RenderMachine>;

export const MemeMachine: Story = {
	render: () => <RenderMachine machine={memeMachine} />,
};
