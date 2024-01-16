import { useState } from 'react';
import { clsx } from 'clsx';

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

	return (
		<div className="flex max-w-screen-sm flex-col justify-center">
			<div className="m-16 flex space-x-8">
				<div className="flex flex-col justify-end space-y-3">
					<div
						className={clsx(
							'flex h-32 w-32 items-center text-5xl font-bold',
							arrow === 'yellow' ? 'text-yellow-300' : 'text-yellow-100',
						)}
					>
						⇦
					</div>
					<div
						className={clsx(
							'flex h-32 w-32 items-center text-5xl font-bold',
							arrow === 'green' ? 'text-green-600' : 'text-green-100',
						)}
					>
						⇦
					</div>
				</div>
				<div className="flex flex-col space-y-3">
					<div className={clsx('h-32 w-32 rounded-full', light === 'red' ? 'bg-red-600' : 'bg-red-100')} />
					<div className={clsx('h-32 w-32 rounded-full', light === 'yellow' ? 'bg-yellow-300' : 'bg-yellow-100')} />
					<div className={clsx('h-32 w-32 rounded-full', light === 'green' ? 'bg-green-600' : 'bg-green-100')} />
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
