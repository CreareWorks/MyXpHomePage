'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useDesktop } from '@/hooks/useDesktop';

type WindowsContextType = ReturnType<typeof useDesktop>;

const WindowsContext = createContext<WindowsContextType | null>(null);

export function WindowsProvider({ children }: { children: ReactNode }) {
    const value = useDesktop();
    return (
        <WindowsContext.Provider value={value}>
            {children}
        </WindowsContext.Provider>
    );
}

export function useWindows() {
    const context = useContext(WindowsContext);
    if (!context) {
        throw new Error('useWindows must be used within a WindowsProvider');
    }
    return context;
}
