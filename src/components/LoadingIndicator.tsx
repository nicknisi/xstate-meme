import { Centered } from './Centered.js';

export const LoadingIndicator = ({ state }: { state?: string }) => {
	return (
		<Centered>
			<div className="text-center">
				<div className="h-32 w-32 animate-spin-slow bg-beef bg-contain bg-no-repeat" />
				{state && <div className="pt-4 font-theramin text-3xl text-white">{state}</div>}
			</div>
		</Centered>
	);
};
