import { useState } from 'react';
import { clsx } from 'clsx';
import { cn } from './utils';

const lights = ['red', 'green', 'yellow'] as const;

export const StopLight = () => {
	const [light, setLight] = useState<(typeof lights)[number]>('red');
	const [arrow, setArrow] = useState<'green' | 'yellow' | undefined>(undefined);

	const [lightIndex, setLightIndex] = useState(0);
	const switchLight = () => {
		const newIndex = (lightIndex + 1) % lights.length;
		setLightIndex(newIndex);
		setLight(lights[lightIndex]);
		setArrow((['green', 'yellow', undefined] as const)[Math.floor(Math.random() * 3)]);
	};

	const c = (c: string) => cn('text-5xl size-32 rounded-full flex flex-col items-center font-bold', c);
	return (
		<div className="m-16 flex max-w-screen-sm flex-col justify-center bg-[#323638] p-32">
			<div className="m-16 flex space-x-8">
				<div className="flex flex-col justify-end space-y-3">
					<div className={c(arrow === 'yellow' ? 'text-yellow-300' : 'text-yellow-100')}>⇦</div>
					<div className={c(arrow === 'green' ? 'text-green-600' : 'text-green-100')}>⇦</div>
				</div>
				<div className="flex flex-col space-y-3">
					<div className={c(light === 'red' ? 'bg-red-600' : 'bg-red-100')} />
					<div className={c(light === 'yellow' ? 'bg-yellow-300' : 'bg-yellow-100')} />
					<div className={c(light === 'green' ? 'bg-green-600' : 'bg-green-100')} />
				</div>
			</div>
			<div className="px-32">
				<button className="mt-4 border border-white bg-sky-400 p-4 font-bold text-black" onClick={switchLight}>
					Switch light
				</button>
			</div>
		</div>
	);
};
