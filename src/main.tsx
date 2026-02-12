import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import './global.css';
import Page from './page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
    <Toaster position="top-right" richColors />
  </StrictMode>,
);
