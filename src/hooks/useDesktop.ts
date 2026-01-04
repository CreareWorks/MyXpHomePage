import { useState, useCallback, useEffect } from 'react';
import { useQueryState, parseAsString } from 'nuqs';
import { DESKTOP_ICON_IDS, type DesktopIconId } from '@/constants/desktopIcon';

export const useDesktop = () => {
    const [appId, setAppId] = useQueryState('app', parseAsString.withOptions({ history: 'push' }));

    const activeWindowId = (appId as DesktopIconId) || DESKTOP_ICON_IDS.ABOUT;

    const [selectedIconId, setSelectedIconId] = useState<DesktopIconId | null>(null);
    const [openWindowIds, setOpenWindowIds] = useState<DesktopIconId[]>([activeWindowId]);
    const [minimizedWindowIds, setMinimizedWindowIds] = useState<DesktopIconId[]>([]);
    const [maximizedWindowIds, setMaximizedWindowsIds] = useState<DesktopIconId[]>([]);

    // URLパラメータがない場合、'about' を表示させる
    useEffect(() => {
        if (!appId) {
            setAppId(DESKTOP_ICON_IDS.ABOUT);
        }
    }, [appId, setAppId]);

    // ブラウザの「戻る・進む」でURLが変わった時にウィンドウリストを同期
    useEffect(() => {
        if (!activeWindowId) return;

        const timer = setTimeout(() => {
            // ウィンドウを開く
            setOpenWindowIds((prev) => {
                if (prev.includes(activeWindowId)) return prev;
                return [...prev, activeWindowId];
            });

            // 最小化解除
            setMinimizedWindowIds((prev) => {
                if (!prev.includes(activeWindowId)) return prev;
                return prev.filter((id) => id !== activeWindowId);
            });
        }, 0);

        // クリーンアップ関数
        return () => clearTimeout(timer);

    }, [activeWindowId]);

    // --- アクション定義 ---
    const selectIcon = useCallback((id: DesktopIconId | null) => {
        setSelectedIconId(id);
    }, []);

    const openWindow = useCallback((id: DesktopIconId) => {
        // クリック時は即座に反映してOK
        setOpenWindowIds((prev) => {
            if (!prev.includes(id)) return [...prev, id];
            return prev;
        });
        setMinimizedWindowIds((prev) => prev.filter((minId) => minId !== id));
        setAppId(id);
    }, [setAppId]);

    const closeWindow = useCallback((id: DesktopIconId) => {
        setOpenWindowIds((prev) => prev.filter((openId) => openId !== id));
        setMinimizedWindowIds((prev) => prev.filter((minId) => minId !== id));
        setMaximizedWindowsIds((prev) => prev.filter((maxId) => maxId !== id));

        if (activeWindowId === id) {
            setAppId(null);
        }
    }, [activeWindowId, setAppId]);

    const toggleMaximizeWindow = useCallback((id: DesktopIconId) => {
        setMaximizedWindowsIds((prev) => {
            const isMaximized = prev.includes(id);
            if (isMaximized) {
                return prev.filter((maxId) => maxId !== id);
            } else {
                return [...prev, id]
            }
        });
        setAppId(id);
    }, [setAppId])

    const minimizeWindow = useCallback((id: DesktopIconId) => {
        setMinimizedWindowIds((prev) => [...prev, id]);
        if (activeWindowId === id) {
            setAppId(null);
        }
    }, [activeWindowId, setAppId]);

    const focusWindow = useCallback((id: DesktopIconId) => {
        setAppId(id);
    }, [setAppId]);

    const handleTaskClick = useCallback((id: DesktopIconId) => {
        setMinimizedWindowIds((prevMinimized) => {
            const isMinimized = prevMinimized.includes(id);

            if (isMinimized) {
                // 復元
                setAppId(id);
                return prevMinimized.filter((minId) => minId !== id);
            }

            if (activeWindowId === id) {
                // 最小化
                setAppId(null);
                return [...prevMinimized, id];
            } else {
                // 最前面へ
                setAppId(id);
                return prevMinimized;
            }
        });
    }, [activeWindowId, setAppId]);

    return {
        selectedIconId,
        openWindowIds,
        activeWindowId,
        minimizedWindowIds,
        maximizedWindowIds,
        selectIcon,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        handleTaskClick,
        toggleMaximizeWindow,
    };
};