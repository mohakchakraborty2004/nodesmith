"use client";

import React from "react";

interface LoaderProps {
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export function AnimatedLoader({ size = 64, strokeWidth = 8, className = "" }: LoaderProps) {
    return (
        <div 
            className={`flex items-center justify-center ${className}`}
            style={{ width: size, height: size }}
        >
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full overflow-visible"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {/* Background track (optional, gives a faint outline of the N) */}
                <path
                    d="M 25 80 L 25 20 L 75 80 L 75 20"
                    className="stroke-surface-container-highest"
                    strokeWidth={strokeWidth}
                />
                
                {/* Animated drawing line */}
                <path
                    d="M 25 80 L 25 20 L 75 80 L 75 20"
                    className="stroke-primary"
                    strokeWidth={strokeWidth}
                    style={{
                        strokeDasharray: 200,
                        strokeDashoffset: 200,
                        animation: "draw-n 2s ease-in-out infinite"
                    }}
                />
            </svg>

            {/* Self-contained CSS keyframes for easy copy-pasting */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes draw-n {
                    0% {
                        stroke-dashoffset: 200;
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    80% {
                        stroke-dashoffset: 0;
                        opacity: 1;
                    }
                    100% {
                        stroke-dashoffset: 0;
                        opacity: 0;
                    }
                }
                `
            }} />
        </div>
    );
}