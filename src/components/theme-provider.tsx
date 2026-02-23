'use client';

import { ThemeProvider } from 'next-themes';
// Provedor de tema - detecta preferência do sistema e permite troca
export function Provider({ children }: { children: React.ReactNode; }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
