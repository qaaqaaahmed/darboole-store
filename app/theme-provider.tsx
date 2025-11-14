'use client';


// we get this code from the readme and usually same for all projects applying dark mode
// we basically pass in props when using this component in the main providers -> like defaultheme="system" enableSystem atttribute="class"
import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}