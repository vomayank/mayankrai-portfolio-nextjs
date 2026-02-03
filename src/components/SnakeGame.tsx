"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface Position {
    x: number;
    y: number;
}

const GRID_SIZE = 15;

const SPEEDS = {
    slow: { label: "🐢 Slow", value: 300 },
    normal: { label: "🐍 Normal", value: 200 },
    fast: { label: "🚀 Fast", value: 120 },
};

type SpeedKey = keyof typeof SPEEDS;

export default function SnakeGame() {
    const [snake, setSnake] = useState<Position[]>([{ x: 7, y: 7 }]);
    const [food, setFood] = useState<Position>({ x: 10, y: 10 });
    const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState<SpeedKey>("normal");

    const generateFood = useCallback(() => {
        let newFood: Position;
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            };
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        return newFood;
    }, [snake]);

    const resetGame = () => {
        setSnake([{ x: 7, y: 7 }]);
        setDirection({ x: 1, y: 0 });
        setFood(generateFood());
        setGameOver(false);
        setScore(0);
        setIsPlaying(true);
    };

    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        if (!isPlaying) return;

        switch (e.key) {
            case "ArrowUp":
            case "w":
                if (direction.y !== 1) setDirection({ x: 0, y: -1 });
                break;
            case "ArrowDown":
            case "s":
                if (direction.y !== -1) setDirection({ x: 0, y: 1 });
                break;
            case "ArrowLeft":
            case "a":
                if (direction.x !== 1) setDirection({ x: -1, y: 0 });
                break;
            case "ArrowRight":
            case "d":
                if (direction.x !== -1) setDirection({ x: 1, y: 0 });
                break;
        }
    }, [direction, isPlaying]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress]);

    useEffect(() => {
        if (!isPlaying || gameOver) return;

        const moveSnake = () => {
            setSnake(prevSnake => {
                const newHead = {
                    x: (prevSnake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
                    y: (prevSnake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
                };

                // Check self collision
                if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    setGameOver(true);
                    setIsPlaying(false);
                    if (score > highScore) setHighScore(score);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Check food collision
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore(prev => prev + 10);
                    setFood(generateFood());
                    return newSnake;
                }

                newSnake.pop();
                return newSnake;
            });
        };

        const gameLoop = setInterval(moveSnake, SPEEDS[speed].value);
        return () => clearInterval(gameLoop);
    }, [direction, food, isPlaying, gameOver, score, highScore, generateFood, speed]);

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-[#0d1117] rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl shadow-purple-500/10">
                {/* Header */}
                <div className="px-6 py-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-white/5 flex items-center justify-between">
                    <span className="font-mono text-sm text-gray-300">🐍 Snake Game</span>
                    <div className="flex gap-4 text-sm font-mono">
                        <span className="text-purple-400">Score: {score}</span>
                        <span className="text-gray-500">Best: {highScore}</span>
                    </div>
                </div>

                {/* Speed Selection */}
                <div className="px-4 py-3 border-b border-white/5">
                    <div className="flex justify-center gap-2">
                        {(Object.keys(SPEEDS) as SpeedKey[]).map((key) => (
                            <button
                                key={key}
                                onClick={() => !isPlaying && setSpeed(key)}
                                disabled={isPlaying}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${speed === key
                                        ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                                    } ${isPlaying ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                            >
                                {SPEEDS[key].label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Game Grid */}
                <div className="p-4">
                    <div
                        className="mx-auto grid gap-[1px] bg-white/5 rounded-lg p-2"
                        style={{
                            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                            width: "fit-content"
                        }}
                    >
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                            const x = i % GRID_SIZE;
                            const y = Math.floor(i / GRID_SIZE);
                            const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
                            const isSnakeBody = snake.slice(1).some(s => s.x === x && s.y === y);
                            const isFood = food.x === x && food.y === y;

                            return (
                                <motion.div
                                    key={i}
                                    className={`w-4 h-4 rounded-sm ${isSnakeHead
                                            ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                                            : isSnakeBody
                                                ? "bg-cyan-500/70"
                                                : isFood
                                                    ? "bg-purple-500 shadow-lg shadow-purple-500/50"
                                                    : "bg-white/5"
                                        }`}
                                    animate={isFood ? { scale: [1, 1.2, 1] } : {}}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Controls */}
                <div className="p-4 border-t border-white/5">
                    {!isPlaying ? (
                        <motion.button
                            onClick={resetGame}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25"
                        >
                            {gameOver ? "🎮 Play Again" : "🚀 Start Game"}
                        </motion.button>
                    ) : (
                        <div className="text-center text-gray-400 text-sm">
                            Use <span className="text-purple-400 font-mono">Arrow Keys</span> or <span className="text-purple-400 font-mono">WASD</span> to move
                        </div>
                    )}

                    {gameOver && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 text-center text-red-400 font-mono"
                        >
                            Game Over! Final Score: {score}
                        </motion.div>
                    )}

                    {/* Mobile Controls */}
                    <div className="mt-4 grid grid-cols-3 gap-2 max-w-[150px] mx-auto md:hidden">
                        <div />
                        <button
                            onClick={() => isPlaying && direction.y !== 1 && setDirection({ x: 0, y: -1 })}
                            className="p-3 bg-white/10 rounded-lg text-white active:bg-purple-500/30"
                        >↑</button>
                        <div />
                        <button
                            onClick={() => isPlaying && direction.x !== 1 && setDirection({ x: -1, y: 0 })}
                            className="p-3 bg-white/10 rounded-lg text-white active:bg-purple-500/30"
                        >←</button>
                        <button
                            onClick={() => isPlaying && direction.y !== -1 && setDirection({ x: 0, y: 1 })}
                            className="p-3 bg-white/10 rounded-lg text-white active:bg-purple-500/30"
                        >↓</button>
                        <button
                            onClick={() => isPlaying && direction.x !== -1 && setDirection({ x: 1, y: 0 })}
                            className="p-3 bg-white/10 rounded-lg text-white active:bg-purple-500/30"
                        >→</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
