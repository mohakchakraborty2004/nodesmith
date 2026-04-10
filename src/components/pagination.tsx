"use client";

import { MoveRightIcon, MoveLeftIcon } from "lucide-react"; 

interface PaginationProp {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isDisabled?: boolean;
}

export const Pagination = ({
    page, 
    totalPages,
    onPageChange,
    isDisabled
}: PaginationProp) => {
    return (
        <footer className="mt-16 flex items-center justify-between border-t border-zinc-200/30 pt-8">
            <div className="flex items-center gap-1">
                <button 
                    disabled={page === 1 || isDisabled}
                    onClick={() => onPageChange(Math.max(1, page - 1))}
                    className="p-3 hover:bg-surface-container-highest rounded-full transition-all text-on-surface active:scale-90 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
                >
                    <MoveLeftIcon className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2 px-4">
                    {/* Active Page Indicator */}
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-on-primary font-bold text-xs text-white">
                        {page}
                    </button>
                    
                    <span className="text-on-surface-variant px-1 font-label text-xs">of</span>
                    
                    {/* Total Pages Indicator */}
                    <button 
                        onClick={() => onPageChange(totalPages)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-highest text-on-surface font-medium text-xs transition-colors"
                    >
                        {totalPages}
                    </button>
                </div>

                <button 
                    disabled={page === totalPages || totalPages === 0 || isDisabled}
                    onClick={() => onPageChange(Math.min(totalPages, page + 1))}
                    className="p-3 hover:bg-surface-container-highest rounded-full transition-all text-on-surface active:scale-90 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center"
                >
                    <MoveRightIcon className="w-5 h-5" />
                </button>
            </div>
            
           
        </footer>
    );
};