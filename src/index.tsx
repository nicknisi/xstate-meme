import { ReactNode, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.js';
import { MachineProvider } from './components/MachineProvider.js';
import { createBrowserInspector } from '@statelyai/inspect';

const root = createRoot(document.getElementById('root')!);

const { inspect } = createBrowserInspector({
	url: 'https://stately.ai/registry/inspect',
	iframe: document.getElementById('inspector-iframe') as HTMLIFrameElement,
});

const options = { inspect: inspect as any };

function Wrapper({ children }: { children: ReactNode }) {
	return (
		<>
			<MachineProvider options={options}>{children}</MachineProvider>

			<iframe id="inspector-iframe" style={{ width: '100%', height: '30vh', position: 'fixed', bottom: 0 }} />
		</>
	);
}

root.render(
	<StrictMode>
		<Suspense fallback={'Loading...'}>
			<Wrapper>
				<App />
			</Wrapper>
		</Suspense>
	</StrictMode>,
);
