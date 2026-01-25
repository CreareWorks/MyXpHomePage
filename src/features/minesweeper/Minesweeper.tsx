'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styles from './Minesweeper.module.css';

type CellValue = number | 'B'; // 数字またはボム
type CellState = 'hidden' | 'revealed' | 'flagged';

interface Cell {
    value: CellValue;
    state: CellState;
}

const ROWS = 10;
const COLS = 10;
const BOMBS = 10;

export default function Minesweeper() {
    const [grid, setGrid] = useState<Cell[][]>([]);
    const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
    const [bombsLeft, setBombsLeft] = useState(BOMBS);
    const [timer, setTimer] = useState(0);

    // 初期グリッド生成
    const initGame = useCallback(() => {
        const newGrid: Cell[][] = Array(ROWS).fill(null).map(() =>
            Array(COLS).fill(null).map(() => ({ value: 0, state: 'hidden' }))
        );

        // ボム配置
        let bombsPlaced = 0;
        while (bombsPlaced < BOMBS) {
            const r = Math.floor(Math.random() * ROWS);
            const c = Math.floor(Math.random() * COLS);
            const cell = newGrid[r]?.[c];
            if (cell && cell.value !== 'B') {
                cell.value = 'B';
                bombsPlaced++;
            }
        }

        // 数字計算
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                const cell = newGrid[r]?.[c];
                if (!cell || cell.value === 'B') continue;
                let count = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newGrid[nr]?.[nc]?.value === 'B') {
                            count++;
                        }
                    }
                }
                cell.value = count;
            }
        }

        setGrid(newGrid);
        setGameState('playing');
        setBombsLeft(BOMBS);
        setTimer(0);
    }, []);

    useEffect(() => {
        initGame();
    }, [initGame]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameState === 'playing' && timer < 999) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameState, timer]);

    const revealCell = (r: number, c: number) => {
        const cell = grid[r]?.[c];
        if (!cell || gameState !== 'playing' || cell.state !== 'hidden') return;

        const newGrid = [...grid.map(row => [...row])];
        const targetCell = newGrid[r]?.[c];
        if (!targetCell) return;

        if (targetCell.value === 'B') {
            // ゲームオーバー：全てのボムを表示
            newGrid.forEach((row) => row.forEach((c) => {
                if (c.value === 'B') c.state = 'revealed';
            }));
            setGrid(newGrid);
            setGameState('lost');
            return;
        }

        const floodFill = (ri: number, ci: number) => {
            const currentCell = newGrid[ri]?.[ci];
            if (ri < 0 || ri >= ROWS || ci < 0 || ci >= COLS || !currentCell || currentCell.state !== 'hidden') return;

            currentCell.state = 'revealed';

            if (currentCell.value === 0) {
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        floodFill(ri + dr, ci + dc);
                    }
                }
            }
        };

        floodFill(r, c);
        setGrid(newGrid);

        // 勝利判定
        const hiddenNonBombs = newGrid.flat().filter(c => c.value !== 'B' && c.state !== 'revealed').length;
        if (hiddenNonBombs === 0) {
            setGameState('won');
        }
    };

    const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
        e.preventDefault();
        const cell = grid[r]?.[c];
        if (!cell || gameState !== 'playing' || cell.state === 'revealed') return;

        const newGrid = [...grid.map(row => [...row])];
        const targetCell = newGrid[r]?.[c];
        if (!targetCell) return;

        if (targetCell.state === 'flagged') {
            targetCell.state = 'hidden';
            setBombsLeft(prev => prev + 1);
        } else {
            targetCell.state = 'flagged';
            setBombsLeft(prev => prev - 1);
        }
        setGrid(newGrid);
    };

    const getFace = () => {
        if (gameState === 'won') return '😎';
        if (gameState === 'lost') return '😵';
        return '🙂';
    };

    return (
        <div className={styles.container}>
            <div className={styles.gameBoard}>
                <div className={styles.header}>
                    <div className={styles.lcdDisplay}>{String(Math.max(0, bombsLeft)).padStart(3, '0')}</div>
                    <button className={styles.faceButton} onClick={initGame}>{getFace()}</button>
                    <div className={styles.lcdDisplay}>{String(timer).padStart(3, '0')}</div>
                </div>
                <div
                    className={styles.grid}
                    style={{ gridTemplateColumns: `repeat(${COLS}, 20px)` }}
                >
                    {grid.map((row, r) =>
                        row.map((cell, c) => (
                            <div
                                key={`${r}-${c}`}
                                className={`${styles.cell} ${cell.state === 'revealed' ? styles.revealed : ''} ${cell.state === 'revealed' && cell.value === 'B' ? styles.bomb : ''}`}
                                onClick={() => revealCell(r, c)}
                                onContextMenu={(e) => toggleFlag(e, r, c)}
                            >
                                {cell.state === 'revealed' && cell.value !== 0 && (
                                    <span className={cell.value !== 'B' ? styles[`num${cell.value}`] : ''}>
                                        {cell.value === 'B' ? '💣' : cell.value}
                                    </span>
                                )}
                                {cell.state === 'flagged' && '🚩'}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
