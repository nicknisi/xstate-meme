import { createBrowserInspector } from '@statelyai/inspect';
import { createActorContext } from '@xstate/react';
import { ReactNode, useRef, useState } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { InspectionEvent, Observer } from 'xstate';
import { memeMachine } from '../memeMachine.js';

const MemeMachineContext = createActorContext(memeMachine);

export const MemeMachineProvider = MemeMachineContext.Provider;

export const useActorRef = MemeMachineContext.useActorRef;
export const useSelector = MemeMachineContext.useSelector;

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function MachineProvider({ children, inspect: shouldInspect }: { children: ReactNode; inspect?: boolean }) {
	const ref = useRef<HTMLIFrameElement | null>(null);
	const [inspect, setInspect] = useState<Observer<InspectionEvent> | undefined>(undefined);

	return (
		<div className="flex h-full w-full gap-1">
			<div className="flex-none">
				{(!shouldInspect || (ref.current && inspect)) && (
					<MemeMachineProvider options={{ inspect }}>{children}</MemeMachineProvider>
				)}
			</div>
			{shouldInspect && (
				<iframe
					ref={iframe => {
						if (!iframe || !iframe.parentElement || ref.current) return;
						ref.current = iframe;
						iframe.parentElement.childNodes.forEach(node => {
							if (node !== iframe) {
								unmountComponentAtNode(node as Element);
							}
						});
						const inspector = createBrowserInspector({
							iframe,
							url: 'https://stately.ai/registry/inspect',
							autoStart: false,
						});
						setInspect(inspector.inspect as Observer<InspectionEvent>);
						// FIXME: is this really necessary?
						sleep(1000).then(() => inspector.start());
					}}
					id="inspector-iframe"
					className="h-full w-full flex-none"
				/>
			)}
		</div>
	);
}

export default MachineProvider;
