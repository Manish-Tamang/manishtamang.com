import React from 'react';

export function LineBreaker() {
    return (
        <div className="max-w-[610px] w-full mx-auto my-4 flex items-center gap-3 px-4 md:px-0">
            <div className="shrink-0 text-[#4CAF50]">
            </div>
            <div className="flex-1 border-t-[1.5px] border-dashed border-zinc-200 dark:border-zinc-800" />
        </div>
    );
}
