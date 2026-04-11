"use client"

import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { Button } from "../ui/button";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred";
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <h2 className="text-lg font-semibold text-destructive">Something went wrong</h2>
            <p className="text-sm text-muted-foreground">{message}</p>
            <Button onClick={resetErrorBoundary}>
                Try again
            </Button>
        </div>
    );
}

export function WorkflowErrorBoundary({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            {children}
        </ErrorBoundary>
    );
}
