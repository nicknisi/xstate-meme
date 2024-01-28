import type { Meta, StoryObj } from '@storybook/react';

import { StopLight } from './StopLight.js';
// import { DayPicker as Calendar } from 'react-day-picker';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
	component: StopLight,
	tags: ['autodocs'],
	args: {},
} satisfies Meta<typeof StopLight>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
	args: {},
};
