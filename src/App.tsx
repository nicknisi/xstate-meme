import { useActorRef, useSelector } from './components/MachineProvider.js';
import { createDotSeparatedString } from './utils.js';
import { CaptureCaption } from './components/CaptureCaption.js';
import { LoadingIndicator } from './components/LoadingIndicator.js';

export function App() {
	const { send } = useActorRef();
	const state = useSelector(state => createDotSeparatedString(state.value));
	const captionCount = useSelector(state => state.context.captions.length);
	const image = useSelector(state => state.context.generatedMemeUrl);
	const loading = useSelector(state => state.tags.has('loading'));
	const clue = useSelector(state => state.context.clue);
	console.log(state);
	return (
		<div className="relative h-full">
			{state !== 'done' && state !== 'enterCaptions.enterCaption' && (
				<h1 className="mt-8 w-[100%] text-center font-bebas text-[9em] shadow-blue-400 text-shadow-lg">XState-meme</h1>
			)}
			{loading && <LoadingIndicator state={state} />}
			{state === 'initial' && (
				<>
					<div className="text-center">
						<p className="p-3 text-2xl">Welcome to Meme Quest! Press the button below to get started.</p>
						<button
							type="button"
							className="rounded-lg border border-white p-3 text-lg"
							onClick={() => send({ type: 'NEXT' })}
						>
							START
						</button>
					</div>
				</>
			)}
			{state === 'showClue' && (
				<>
					<div className="text-center">
						<p className="p-3 text-2xl">Your Clue:</p>
						<p className="whitespace-pre p-3 text-5xl">{clue}</p>
						<button
							type="button"
							className="rounded-lg border border-white p-3 text-lg"
							onClick={() => send({ type: 'NEXT' })}
						>
							NEXT
						</button>
					</div>
				</>
			)}
			{state === 'enterCaptions.enterCaption' && (
				<>
					<CaptureCaption captionNumber={captionCount + 1} onCapture={value => send({ type: 'ADD_CAPTION', value })} />
				</>
			)}
			{state === 'done' && image && <img src={image} alt="generated meme" className="h-full w-full object-contain" />}
		</div>
	);
}

export default App;
