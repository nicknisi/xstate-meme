import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { MachineProvider } from './components/MachineProvider';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Suspense fallback={'Loading...'}>
      <MachineProvider>
        <App />
      </MachineProvider>
    </Suspense>
  </StrictMode>,
);
