import { useState, useCallback } from 'react';
import { type DesktopIconId } from '@/constants/desktopIcon';

export const useDesktop = () => {
    // --- State定義 ---
    const [selectedIconId, setSelectedIconId] = useState<DesktopIconId | null>(null);
    const [openWindowIds, setOpenWindowIds] = useState<DesktopIconId[]>([]);
    const [activeWindowId, setActiveWindowId] = useState<DesktopIconId | null>(null);
    const [minimizedWindowIds, setMinimizedWindowIds] = useState<DesktopIconId[]>([]);

    // --- アクション定義 ---

    // アイコン選択
    const selectIcon = useCallback((id: DesktopIconId | null) => {
        setSelectedIconId(id);
    }, []);

    // ウィンドウを開く（アイコンダブルクリック時など）
    const openWindow = useCallback((id: DesktopIconId) => {
        setOpenWindowIds((prev) => {
            if (!prev.includes(id)) return [...prev, id];
            return prev;
        });
        // 最小化解除 & 最前面へ
        setMinimizedWindowIds((prev) => prev.filter((minId) => minId !== id));
        setActiveWindowId(id);
    }, []);

    // ウィンドウを閉じる（×ボタン）
    const closeWindow = useCallback((id: DesktopIconId) => {
        setOpenWindowIds((prev) => prev.filter((openId) => openId !== id));
        setMinimizedWindowIds((prev) => prev.filter((minId) => minId !== id));
        setActiveWindowId((prev) => (prev === id ? null : prev));
    }, []);

    // ウィンドウを最小化（_ボタン）
    const minimizeWindow = useCallback((id: DesktopIconId) => {
        setMinimizedWindowIds((prev) => [...prev, id]);
        setActiveWindowId(null);
    }, []);

    // ウィンドウをフォーカス（最前面化）
    const focusWindow = useCallback((id: DesktopIconId) => {
        setActiveWindowId(id);
    }, []);

    const handleTaskClick = useCallback((id: DesktopIconId) => {
        const isMinimized = minimizedWindowIds.includes(id);
        const isActive = activeWindowId === id;

        if (isMinimized) {
            // 復元 & 最前面
            setMinimizedWindowIds((prev) => prev.filter((minId) => minId !== id));
            setActiveWindowId(id);
        } else if (isActive) {
            // 最小化
            setMinimizedWindowIds((prev) => [...prev, id]);
            setActiveWindowId(null);
        } else {
            // 最前面へ
            setActiveWindowId(id);
        }
    }, [minimizedWindowIds, activeWindowId]);

    return {
        // State
        selectedIconId,
        openWindowIds,
        activeWindowId,
        minimizedWindowIds,

        // Actions
        selectIcon,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        handleTaskClick,
    };
};