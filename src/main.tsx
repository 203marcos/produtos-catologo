import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';
import { Provider } from '@/components/theme-provider';
import './global.css';
import Page from './page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Page />
      <Toaster position="top-right" richColors />
    </Provider>
  </StrictMode>,
);
