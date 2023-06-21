import { useActor, useSelector } from './components/MachineProvider';
import { createDotSeparatedString } from './utils';
import { CaptureCaption } from './components/CaptureCaption';
import { Centered } from './components/Centered';

export function App() {
  const [, send] = useActor();
  const state = useSelector((state) => createDotSeparatedString(state.value));
  const captionCount = useSelector((state) => state.context.captions.length);
  const image = useSelector((state) => state.context.generatedMemeUrl);
  const loading = useSelector((state) => state.tags.has('loading'));
  const canPressNext = useSelector((state) => state.can('NEXT'));
  const clue = useSelector((state) => state.context.clue);
  console.log(state);
  return (
    <div className="relative">
      {state !== 'done' && (
        <h1 className="fixed w-[100%] mt-8 font-theramin text-[9em] text-shadow-lg shadow-blue-400 text-center">
          Meme Quest
        </h1>
      )}
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
      {state === 'showClue' && clue && (
        <Centered>
          <div className="text-center">
            <p className="text-2xl p-3">Your Clue:</p>
            <p className="text-5xl p-3 whitespace-pre">{clue}</p>
            <button className="p-3 text-lg border-white border rounded-lg" onClick={() => send('NEXT')}>
              ADD CAPTION(S)
            </button>
          </div>
        </Centered>
      )}
      {state === 'selectMeme' && (
        <Centered>
          <div className="text-center">
            <p className="text-2xl p-3">Random meme selected! Press Continue to add caption(s).</p>
            <button className="p-3 text-lg border-white border rounded-lg" onClick={() => send('NEXT')}>
              CONTINUE
            </button>
          </div>
        </Centered>
      )}
      {loading && (
        <Centered>
          <div className="bg-beef w-32 h-32 bg-contain bg-no-repeat animate-spin-slow" />
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
