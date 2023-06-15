import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Suspense fallback={'Loading...'}>
      <App />
    </Suspense>
  </StrictMode>,
);
