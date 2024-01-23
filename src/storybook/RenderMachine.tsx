import { createBrowserInspector } from '@statelyai/inspect';
import { useMachine } from '@xstate/react';
import { useMemo, useRef, useState, useEffect, RefObject } from 'react';
import { InspectionEvent, Observer, type StateMachine, createActor, Actor, ActorLogicFrom } from 'xstate';

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

function useInspectedMachine<T extends AnyStateMachine>(machine: T, iframe: HTMLIFrameElement | null) {
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
	const { actor, inspector } = useInspectedMachine(machine, iframe);

	useEffect(() => {
		if (actor) {
			Promise.resolve(inspector?.start()).then(() => actor.start());
		}
	}, [actor, inspector]);

	console.log('RenderMachines', machine, actor, inspector);

	return (
		<div>
			<iframe style={{ width: '100%', height: '100%', border: 0 }} ref={ref} />
		</div>
	);
}
