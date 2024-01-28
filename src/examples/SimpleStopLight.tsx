import { useState } from 'react';
import { cn } from './utils.js';

const lights = ['red', 'green', 'yellow'] as const;

export const useRandomLightValue = () => {
	const [light, setLight] = useState<(typeof lights)[number]>('red');

	const switchLight = () => {
		// ok this is really contrived 🙈
		const randomLight = lights[Math.floor(Math.random() * lights.length)];
		setLight(randomLight);
	};

	return { light, switchLight } as const;
};

export const useOrderedLightValue = () => {
	const [lightIndex, setLightIndex] = useState(0);

	const switchLight = () => {
		setLightIndex((lightIndex + 1) % lights.length);
	};

	return { light: lights[lightIndex], switchLight } as const;
};

export function SimpleStopLight({ arrows }: { arrows?: boolean }) {
	const { light, switchLight } = useOrderedLightValue();

	const classes = (c: string) => cn('size-32 rounded-full', c);

	return (
		<div className="m-16 flex flex-col gap-2 bg-[#323638] p-32">
			<div className={classes(light === 'red' ? 'bg-red-600' : 'bg-red-100')} />
			<div className={classes(light === 'yellow' ? 'bg-yellow-300' : 'bg-yellow-100')} />
			<div className={classes(light === 'green' ? 'bg-green-600' : 'bg-green-100')} />
			<button className="max-w-32 rounded-lg bg-blue-600 font-bold text-white" onClick={switchLight}>
				Switch light
			</button>
		</div>
	);
}
