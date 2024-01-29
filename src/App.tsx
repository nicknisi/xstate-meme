import { useActorRef, useSelector } from './components/MachineProvider.js';
import { createDotSeparatedString } from './utils.js';
import TextPrompt from './components/TextPrompt.js';
import { LoadingIndicator } from './components/LoadingIndicator.js';

const useIsEventAvailable = (eventName: string) => useSelector(state => state.can({ type: eventName } as any));

export function App() {
	const { send: sendEvent } = useActorRef();
	const send = (event: any) => sendEvent(event);
	const state = useSelector(state => createDotSeparatedString(state.value));
	const captionCount = useSelector(state => state.context.captions.length);
	const image = useSelector(state => state.context.generatedMemeUrl);
	const loading = useSelector(state => state.tags.has('loading'));
	const clue = useSelector(state => state.context.clue);
	const captionTotal = useSelector(state => state.context.selectedMeme?.box_count ?? 0);
	const canRetry = useIsEventAvailable('RETRY');
	const canPrompt = useIsEventAvailable('ENTER_PROMPT');
	return (
		<div className="relative h-full">
			{state !== 'done' && (
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
							onClick={() => send({ type: 'START' })}
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
						<div className="flex justify-center gap-2">
							{canRetry && (
								<button
									type="button"
									className="rounded-lg border border-white p-3 text-lg"
									onClick={() => send({ type: 'RETRY' })}
								>
									RETRY
								</button>
							)}
							<button
								type="button"
								className="rounded-lg border border-white p-3 text-lg"
								onClick={() => send({ type: 'ENTER_CAPTIONS' })}
							>
								ADD CAPTIONS
							</button>
							{canPrompt && (
								<button
									type="button"
									className="rounded-lg border border-white p-3 text-lg"
									onClick={() => send({ type: 'ENTER_PROMPT' })}
								>
									ENTER PROMPT
								</button>
							)}
						</div>
					</div>
				</>
			)}
			{state === 'enterPrompt.initial' && (
				<>
					<TextPrompt title="Enter Prompt" onCapture={value => send({ type: 'ADD_PROMPT', value })} />
				</>
			)}
			{state === 'enterCaptions.enterCaption' && (
				<>
					<TextPrompt
						title={`Caption ${captionCount + 1} / ${captionTotal} `}
						onCapture={value => send({ type: 'ADD_CAPTION', value })}
					/>
				</>
			)}
			{state === 'done' && image && <img src={image} alt="generated meme" className="h-full w-full object-contain" />}
		</div>
	);
}

export default App;
