import type { Meta, StoryObj } from '@storybook/react';
import { RenderMachine } from 'storybook-xstate-addon/RenderMachine';
import { memeMachine } from './memeMachine';

const meta: Meta = {
  title: 'Meme Machine Final',
};

export default meta;

type Story = StoryObj<typeof RenderMachine>;

export const MemeMachineFinal: Story = {
  render: () => <RenderMachine machine={memeMachine} />,
};
