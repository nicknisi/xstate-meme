import { createBrowserInspector } from '@statelyai/inspect';
import { RefObject, useEffect, useRef, useState } from 'react';
import { InspectionEvent, Observer, createActor, type StateMachine } from 'xstate';

type AnyStateMachine = StateMachine<any, any, any, any, any, any, any, any, any, any, any>;

export interface RenderMachineProps<T extends AnyStateMachine = AnyStateMachine> {
	machine: T;
}

/**
 * This hook is used to get a ref to an element and also get the current value of that ref.
 * @param initial The initial value of the ref.
 * @returns A tuple containing the ref and the current value of the ref.
 */
export function useRendererOnRef<T>(initial: T | null): [RefObject<T>, T | null] {
	const ref = useRef<T>(initial);
	const [state, setState] = useState<T | null>(ref.current);
	useEffect(() => {
		setState(ref.current);
	}, [ref.current]);

	return [ref, state] as const;
}

/**
 * Create a new actor and inspector for the given machine.
 */
function useInspectedActor<T extends AnyStateMachine>(machine: T, iframe: HTMLIFrameElement | null) {
	const [actor, setActor] = useState<ReturnType<typeof createActor> | null>(null);
	const [inspector, setInspector] = useState<ReturnType<typeof createBrowserInspector> | null>(null);
	useEffect(() => {
		if (iframe) {
			const inspector = createBrowserInspector({
				url: 'https://stately.ai/registry/inspect',
				iframe,
				autoStart: true,
			});
			const actor = createActor(machine, { inspect: inspector.inspect as Observer<InspectionEvent> });
			setActor(actor);
			setInspector(inspector);
		}
	}, [machine, iframe]);

	return { actor, inspector } as const;
}

export default function RenderMachine({ machine }: RenderMachineProps) {
	const [ref, iframe] = useRendererOnRef<HTMLIFrameElement>(null);
	const { actor, inspector } = useInspectedActor(machine, iframe);

	useEffect(() => {
		if (actor) {
			Promise.resolve(inspector?.start()).then(() => actor.start());
		}
	}, [actor, inspector]);

	console.log('RenderMachines', machine, actor, inspector);

	return (
		<div className="h-full w-full">
			<iframe className="h-full w-full" ref={ref} />
		</div>
	);
}
