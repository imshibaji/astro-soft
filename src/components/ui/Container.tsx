import React from 'react';

export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:px-8">
            {children}
        </div>
    )
}