import { createBrowserInspector } from '@statelyai/inspect';
import { useRef, useState } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { Actor, InspectionEvent, Observer, StateMachine, createActor } from 'xstate';

type InspectorOptions = Parameters<typeof createBrowserInspector>[0];
type AnyStateMachine = StateMachine<any, any, any, any, any, any, any, any, any, any, any>;

interface Props<TMachine extends AnyStateMachine> {
	machine: TMachine;
	delay?: number;
	inspectOptions?: Omit<InspectorOptions, 'iframe'>;
}

/**
 * Renders a machine in an iframe.
 * This is based on the RenderMachine component from storybook-xstate-addon (updated to use xstate 5).
 */
export default function RenderMachine<TMachine extends AnyStateMachine>({ machine }: Props<TMachine>) {
	const iframeRef = useRef<HTMLIFrameElement | null>();
	const [_actor, setActor] = useState<Actor<TMachine> | null>(null);

	return (
		<iframe
			className="h-full w-full border-0"
			ref={iframe => {
				if (!iframe || !iframe.parentElement || iframeRef.current) return;
				iframeRef.current = iframe;
				iframe.parentElement.childNodes.forEach(node => {
					if (node !== iframe) {
						unmountComponentAtNode(node as Element);
					}
				});
				const inspector = createBrowserInspector({
					iframe,
					url: 'https://stately.ai/registry/inspect',
				});
				const actor = createActor(machine, { inspect: inspector.inspect as Observer<InspectionEvent> });
				setActor(actor);
				actor.start();
			}}
		/>
	);
}
