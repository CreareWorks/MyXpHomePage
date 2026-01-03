import { useState, useEffect, useRef } from 'react';

// 座標とサイズの型定義
type Position = { x: number; y: number };
type Size = { width: number; height: number };

export const useWindowFrame = (
    initialPos: Position = { x: 100, y: 100 },
    initialSize: Size = { width: 600, height: 400 }
) => {
    // ウィンドウの状態管理
    const [position, setPosition] = useState<Position>(initialPos);
    const [size, setSize] = useState<Size>(initialSize);

    // 操作中のフラグ
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);

    // マウス位置のズレを計算するためのRef
    const dragOffset = useRef<Position>({ x: 0, y: 0 });
    const startSize = useRef<Size>({ width: 0, height: 0 });
    const startMousePos = useRef<Position>({ x: 0, y: 0 });

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

        // 操作中のみイベントリスナーを登録（パフォーマンス対策）
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
        handleMouseDownDrag,
        handleMouseDownResize,
    };
};