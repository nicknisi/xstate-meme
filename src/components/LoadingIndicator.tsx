export const LoadingIndicator = ({ state }: { state?: string }) => {
	return (
		<div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center text-center">
			<img src="/beef_nick.png" className="size-32 animate-spin-slow object-contain" />
			{state && <div className="pt-4 font-theramin text-3xl text-white">{state}</div>}
		</div>
	);
};
