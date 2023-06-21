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
      <h2 className="text-[200px] text-center whitespace-nowrap">Caption {captionNumber}</h2>
      <input
        type="text"
        className="m-32 px-12 self-center bg-slate-900 text-white h-xxl w-[80%] text-[400px] shadow-blue-400 text-shadow-lg border border-gray-800"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onCapture(caption);
            setCaption('');
          }
        }}
      />
    </div>
  );
};
