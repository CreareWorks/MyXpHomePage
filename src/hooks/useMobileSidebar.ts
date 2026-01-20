'use client';

import { useState, useCallback } from 'react';

/**
 * スマホ用のサイドバー開閉状態を管理するフック
 */
export function useMobileSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsSidebarOpen(false);
    }, []);

    const openSidebar = useCallback(() => {
        setIsSidebarOpen(true);
    }, []);

    return {
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        openSidebar,
    };
}
