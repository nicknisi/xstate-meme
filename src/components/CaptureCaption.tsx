import { useState } from 'react';

export const CaptureCaption = ({
	onCapture,
	captionNumber,
}: {
	captionNumber: number;
	onCapture: (caption: string) => void;
}) => {
	const [caption, setCaption] = useState('');
	return (
		<div className="flex flex-col">
			<h2 className="whitespace-nowrap text-center text-[200px]">Caption {captionNumber}</h2>
			<input
				type="text"
				className="h-xxl m-32 w-[80%] self-center border border-gray-800 bg-slate-900 px-12 text-[200px] text-white shadow-blue-400 text-shadow-lg"
				value={caption}
				onChange={e => setCaption(e.target.value)}
				onKeyUp={e => {
					if (e.key === 'Enter') {
						onCapture(caption);
						setCaption('');
					}
				}}
			/>
		</div>
	);
};
