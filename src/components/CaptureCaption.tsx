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
    <div>
      <h2 className="text-[250px] text-center">Enter Caption {captionNumber}</h2>
      <input
        type="text"
        className="px-4 bg-slate-900 text-white h-xxl w-full text-[400px]"
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
