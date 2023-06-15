import clsx from 'clsx';
import { useActor, useSelector } from './components/MachineProvider';
import { createDotSeparatedString } from './utils';
import { CaptureCaption } from './components/CaptureCaption';

export function App() {
  const [, send] = useActor();
  const state = useSelector((state) => createDotSeparatedString(state.value));
  const captionCount = useSelector((state) => state.context.captions.length);
  const image = useSelector((state) => state.context.generatedMemeUrl);
  console.log(state);
  return (
    <>
      {state === 'enterCaptions.enterCaption' && (
        <CaptureCaption captionNumber={captionCount + 1} onCapture={(value) => send({ type: 'ADD_CAPTION', value })} />
      )}
      {state === 'done' && image && (
        <div>
          <img src={image} alt="generated meme" className={clsx('w-full', 'h-full')} />
        </div>
      )}
    </>
  );
}

export default App;
