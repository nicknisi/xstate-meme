import type { Meta, StoryObj } from '@storybook/react';
import { RenderMachine } from 'storybook-xstate-addon/RenderMachine';
import { lightMachine } from './lightMachine';

const meta: Meta = {
  title: 'Light Machine',
};

export default meta;

type Story = StoryObj<typeof RenderMachine>;

export const MemeMachine: Story = {
  render: () => <RenderMachine machine={lightMachine} />,
};
