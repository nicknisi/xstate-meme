import { useActor, useSelector } from './components/MachineProvider';
import { createDotSeparatedString } from './utils';
import { CaptureCaption } from './components/CaptureCaption';
import { Centered } from './components/Centered';
import { LoadingIndicator } from './components/LoadingIndicator';

export function App() {
  const [, send] = useActor();
  const state = useSelector((state) => createDotSeparatedString(state.value));
  const captionCount = useSelector((state) => state.context.captions.length);
  const image = useSelector((state) => state.context.generatedMemeUrl);
  const loading = useSelector((state) => state.tags.has('loading'));
  const clue = useSelector((state) => state.context.clue);
  console.log(state);
  return (
    <div className="relative">
      {state !== 'done' && state !== 'enterCaptions.enterCaption' && (
        <h1 className="fixed w-[100%] mt-8 font-theramin text-[9em] text-shadow-lg shadow-blue-400 text-center">
          Meme Quest
        </h1>
      )}
      {loading && <LoadingIndicator state={state} />}
      {state === 'initial' && (
        <Centered>
          <div className="text-center">
            <p className="text-2xl p-3">Welcome to Meme Quest! Press the button below to get started.</p>
            <button className="p-3 text-lg border-white border rounded-lg" onClick={() => send('NEXT')}>
              START
            </button>
          </div>
        </Centered>
      )}
      {state === 'showClue' && (
        <Centered>
          <div className="text-center">
            <p className="text-2xl p-3">Your Clue:</p>
            <p className="text-5xl p-3 whitespace-pre">{clue}</p>
            <button className="p-3 text-lg border-white border rounded-lg" onClick={() => send('NEXT')}>
              NEXT
            </button>
          </div>
        </Centered>
      )}
      {state === 'enterCaptions.enterCaption' && (
        <Centered>
          <CaptureCaption
            captionNumber={captionCount + 1}
            onCapture={(value) => send({ type: 'ADD_CAPTION', value })}
          />
        </Centered>
      )}
      {state === 'done' && image && (
        <div>
          <img src={image} alt="generated meme" className="h-full w-full" />
        </div>
      )}
    </div>
  );
}

export default App;
