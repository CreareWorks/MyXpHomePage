import { useState, useCallback, useEffect, useRef, RefObject } from 'react';
import { useQueryState, parseAsString } from 'nuqs';
import { DESKTOP_ICON_IDS, type DesktopIconId } from '@/constants/desktopIconConstants';

const VALID_ICON_IDS = new Set<string>(Object.values(DESKTOP_ICON_IDS));
function toDesktopIconId(id: string | null): DesktopIconId | null {
    if (id && VALID_ICON_IDS.has(id)) return id as DesktopIconId;
    return null;
}

export const useDesktop = () => {
    const [appId, setAppId] = useQueryState('app', parseAsString.withOptions({ history: 'push' }));

    const activeWindowId = toDesktopIconId(appId);

    const [selectedIconId, setSelectedIconId] = useState<DesktopIconId | null>(null);
    const [openWindowIds, setOpenWindowIds] = useState<DesktopIconId[]>([]);
    const [minimizedWindowIds, setMinimizedWindowIds] = useState<DesktopIconId[]>([]);
    const [maximizedWindowIds, setMaximizedWindowIds] = useState<DesktopIconId[]>([]);

    const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);

    const isInitialized: RefObject<boolean> = useRef(false);

    // URLパラメータがない場合、aboutを表示させる
    useEffect(() => {
        if (isInitialized.current) return;
        const timer = setTimeout(() => {
            isInitialized.current = true; // 実行済みにマーク

            if (activeWindowId) {
                // URL指定がある場合
                setOpenWindowIds([activeWindowId]);
                setMaximizedWindowIds([activeWindowId]);
            } else {
                // URL指定がない場合: デフォルトで About を開く
                setAppId(DESKTOP_ICON_IDS.ABOUT);
                setOpenWindowIds([DESKTOP_ICON_IDS.ABOUT]);
                setMaximizedWindowIds([DESKTOP_ICON_IDS.ABOUT]);
            }
        }, 0);

        return () => clearTimeout(timer);
    }, [activeWindowId, setAppId]);

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

            // 最大化（URLからの遷移時はデフォルトで最大化）
            setMaximizedWindowIds((prev) => {
                if (prev.includes(activeWindowId)) return prev;
                return [...prev, activeWindowId];
            });
        }, 0);
        return () => clearTimeout(timer);
    }, [activeWindowId]);

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
        // デフォルトで最大化させる
        setMaximizedWindowIds((prev) => {
            if (!prev.includes(id)) return [...prev, id];
            return prev;
        });
        setAppId(id);

        // アプリを開いた時に、スタートボタンを閉じさせる
        setIsStartMenuOpen(false);
    }, [setAppId]);

    const closeWindow = useCallback((id: DesktopIconId) => {
        setOpenWindowIds((prev) => prev.filter((openId) => openId !== id));
        setMinimizedWindowIds((prev) => prev.filter((minId) => minId !== id));
        setMaximizedWindowIds((prev) => prev.filter((maxId) => maxId !== id));

        if (activeWindowId === id) {
            setAppId(null);
        }
    }, [activeWindowId, setAppId]);

    const toggleMaximizeWindow = useCallback((id: DesktopIconId) => {
        setMaximizedWindowIds((prev) => {
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

    // スタートメニュー関連
    // スタートボタン開く
    const toggleStartMenu = useCallback(() => {
        setIsStartMenuOpen((prev) => !prev);
    }, []);
    const closeStartMenu = useCallback(() => {
        setIsStartMenuOpen(false);
    }, []);

    // ログオフボタンの挙動 全てのウィンドウを閉じる
    const closeAllWindows = useCallback(() => {
        setOpenWindowIds([]);
        setMinimizedWindowIds([]);
        setMaximizedWindowIds([]);
        setAppId(null);
        setIsStartMenuOpen(false);
    }, [setAppId]);

    return {
        selectedIconId,
        openWindowIds,
        activeWindowId,
        minimizedWindowIds,
        maximizedWindowIds,
        isStartMenuOpen,
        selectIcon,
        openWindow,
        closeWindow,
        minimizeWindow,
        focusWindow,
        handleTaskClick,
        toggleMaximizeWindow,
        toggleStartMenu,
        closeStartMenu,
        closeAllWindows,
    };
};