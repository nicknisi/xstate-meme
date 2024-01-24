import { useState } from 'react';
import { useSelector } from './MachineProvider';

export const CaptureCaption = ({
	onCapture,
	captionNumber,
}: {
	captionNumber: number;
	onCapture: (caption: string) => void;
}) => {
	const [caption, setCaption] = useState('');
	const captionTotal = useSelector(state => state.context.selectedMeme?.box_count ?? 0);
	return (
		<div className="flex flex-col">
			<h2 className="text-center font-bebas text-6xl">
				Caption {captionNumber} / {captionTotal}
			</h2>
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
