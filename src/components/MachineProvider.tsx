import { createBrowserInspector } from '@statelyai/inspect';
import { createActorContext } from '@xstate/react';
import { ReactNode, useRef, useState } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { InspectionEvent, Observer } from 'xstate';
import { memeMachine } from '../machines/memeMachine.js';
import { cn } from '../utils.js';

const MemeMachineContext = createActorContext(memeMachine);

const MemeMachineProvider = MemeMachineContext.Provider;

export function MachineProvider({ children, inspect: shouldInspect }: { children: ReactNode; inspect?: boolean }) {
	const ref = useRef<HTMLIFrameElement | null>(null);
	const [inspect, setInspect] = useState<Observer<InspectionEvent> | undefined>(undefined);

	return (
		<div className={cn('grid h-full w-full grid-rows-1 gap-0', shouldInspect ? 'grid-cols-2' : 'grid-cols-1')}>
			<div className="">
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
						});
						setInspect(inspector.inspect as Observer<InspectionEvent>);
					}}
					id="inspector-iframe"
					className="h-full w-full"
				/>
			)}
		</div>
	);
}

export const useActorRef = MemeMachineContext.useActorRef;
export const useSelector = MemeMachineContext.useSelector;
export default MachineProvider;
