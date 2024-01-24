import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import { MachineProvider } from './components/MachineProvider.js';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
	<Suspense fallback={'Loading...'}>
		<MachineProvider inspect>
			<App />
		</MachineProvider>
	</Suspense>,
);
