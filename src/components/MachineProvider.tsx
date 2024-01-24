import { createBrowserInspector } from '@statelyai/inspect';
import { createActorContext } from '@xstate/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { InspectionEvent, Observer } from 'xstate';
import { memeMachine } from '../memeMachine.js';

const inspector = createBrowserInspector({
	url: 'https://stately.ai/registry/inspect',
	iframe: document.getElementById('inspector-iframe') as HTMLIFrameElement,
});

const inspect = inspector.inspect as Observer<InspectionEvent>;

const MemeMachineContext = createActorContext(memeMachine, { inspect });

export const MemeMachineProvider = MemeMachineContext.Provider;

export const useActorRef = MemeMachineContext.useActorRef;
export const useSelector = MemeMachineContext.useSelector;

export function MachineProvider({ children, inspect: shouldInspect }: { children: ReactNode; inspect?: boolean }) {
	const ref = useRef<HTMLIFrameElement | null>(null);
	const [inspect, setInspect] = useState<Observer<InspectionEvent> | undefined>(undefined);

	useEffect(() => {
		if (ref.current) {
			const { inspect } = createBrowserInspector({
				url: 'https://stately.ai/registry/inspect',
				iframe: ref.current,
			});

			setInspect(inspect as Observer<InspectionEvent>);
		}
	}, [ref.current, shouldInspect, setInspect]);

	return (
		<div className="flex gap-1">
			<div>
				<MemeMachineProvider options={{ inspect }}>{children}</MemeMachineProvider>
			</div>
			{shouldInspect && <iframe ref={ref} id="inspector-iframe" className="h-full w-full" />}
		</div>
	);
}

export default MachineProvider;
