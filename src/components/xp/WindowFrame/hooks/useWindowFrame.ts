import { useState, useEffect, useRef } from 'react';

// 座標とサイズの型定義
type Position = { x: number; y: number };
type Size = { width: number; height: number };

export const useWindowFrame = (
    defaultSize: Size = { width: 600, height: 400 }
) => {
    // ウィンドウの状態管理
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [size, setSize] = useState<Size>(defaultSize);

    // 操作中のフラグ
    const [isMounted, setIsMounted] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    // マウス位置のズレを計算するためのRef
    const dragOffset = useRef<Position>({ x: 0, y: 0 });
    const startSize = useRef<Size>({ width: 0, height: 0 });
    const startMousePos = useRef<Position>({ x: 0, y: 0 });

    useEffect(() => {
        const frameId = requestAnimationFrame(() => {
            if (typeof window === 'undefined') return;

            // ブラウザの画面サイズを取得
            const winW = window.innerWidth;
            const winH = window.innerHeight;

            // スマホ対応: 画面幅がデフォルト幅より小さい場合、画面幅の90%にする
            const initialWidth = winW < defaultSize.width ? winW * 0.9 : defaultSize.width;
            const initialHeight = winH < defaultSize.height ? winH * 0.8 : defaultSize.height;

            // 中央座標を計算: (画面幅 - ウィンドウ幅) / 2
            const centerX = (winW - initialWidth) / 2;
            const centerY = (winH - initialHeight) / 2;

            setSize({ width: initialWidth, height: initialHeight });
            setPosition({ x: centerX, y: centerY });
            setIsMounted(true); // 計算完了を表示
        });
        return () => cancelAnimationFrame(frameId);
    }, [defaultSize.width, defaultSize.height]);

    // ドラッグ開始処理
    const handleMouseDownDrag = (e: React.MouseEvent) => {
        // 左クリック(button 0)以外は無視
        if (e.button !== 0) return;
        
        setIsDragging(true);
        // 「クリックした場所」と「ウィンドウ左上」の差分を保存
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
        e.preventDefault();
    };

    // リサイズ開始処理
    const handleMouseDownResize = (e: React.MouseEvent) => {
        if (e.button !== 0) return;

        setIsResizing(true);
        // 開始時のサイズとマウス位置を記録
        startSize.current = size;
        startMousePos.current = { x: e.clientX, y: e.clientY };

        e.preventDefault();
        e.stopPropagation();
    };

    // グローバルなマウス操作（ドラッグ中の追従）
    useEffect(() => {
        // マウスが動いた時の処理
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPosition({
                    x: e.clientX - dragOffset.current.x,
                    y: e.clientY - dragOffset.current.y,
                });
            }
            if (isResizing) {
                const deltaX = e.clientX - startMousePos.current.x;
                const deltaY = e.clientY - startMousePos.current.y;
                
                // 最小サイズ制限（幅200px, 高さ150px）
                setSize({
                    width: Math.max(200, startSize.current.width + deltaX),
                    height: Math.max(150, startSize.current.height + deltaY),
                });
            }
        };

        // マウスを離した時の処理
        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        // 操作中のみイベントリスナーを登録
        if (isDragging || isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        // クリーンアップ
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing]);

    return {
        position,
        size,
        isMounted,
        handleMouseDownDrag,
        handleMouseDownResize,
    };
};