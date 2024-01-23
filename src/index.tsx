import { createBrowserInspector } from '@statelyai/inspect';
import { ReactNode, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { MachineProvider } from './components/MachineProvider.js';
import './index.css';
import { memeMachine } from './memeMachine';
import RenderMachine from './storybook/RenderMachine';

const root = createRoot(document.getElementById('root')!);

// const { inspect } = createBrowserInspector({
// 	url: 'https://stately.ai/registry/inspect',
// 	iframe: document.getElementById('inspector-iframe') as HTMLIFrameElement,
// });

// const options = { inspect: inspect as any };

// function Wrapper({ children }: { children: ReactNode }) {
// 	return (
// 		<>
// 			<MachineProvider options={options}>{children}</MachineProvider>

// 			<iframe id="inspector-iframe" style={{ width: '100%', height: '30vh', position: 'fixed', bottom: 0 }} />
// 		</>
// 	);
// }

root.render(
	<StrictMode>
		<Suspense fallback={'Loading...'}>
			<RenderMachine machine={memeMachine} />
		</Suspense>
	</StrictMode>,
);
