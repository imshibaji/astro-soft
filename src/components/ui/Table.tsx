/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export function Table({ children }: { children: React.ReactNode }) {
    return (
        <TableContainer>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                {children}
            </table>
        </TableContainer>
    );
}

export function TableContainer({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function TableHead({ children }: { children: React.ReactNode }) {
    return (
        <thead className="divide-y divide-gray-200 dark:divide-neutral-700">
            <tr>
                {children}
            </tr>
        </thead>
    )
}

export function TableBody({ children }: { children: React.ReactNode }) {
    return (
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
            {children}
        </tbody>
    )
}

export function TableFooter({ children }: { children: React.ReactNode }) {
    return (
        <tfoot className="divide-y divide-gray-200 dark:divide-neutral-700">
            <tr>
                {children}
            </tr>
        </tfoot>
    )
}

export function TR({ children, ...props }: { children: React.ReactNode, [key: string]: any }) {
    return (
        <tr {...props}>
            {children}
        </tr>
    )
}

export function TH({ children, align = 'left', ...props }: { children: React.ReactNode, align?: 'left' | 'center' | 'right', [key: string]: any }) {
    return (
        <th {...props} className={`px-6 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider dark:text-neutral-200 ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''}`}>
            {children}
        </th>
    )
}

export function TD({ children, align = 'left', ...props }: { children: React.ReactNode, align?: 'left' | 'center' | 'right', [key: string]: any }) {
    return (
        <td {...props} className={ `${props.className} px-6 py-4 whitespace-normal ${align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''} text-sm text-gray-800 dark:text-neutral-200` }>
            {children}
        </td>
    )
}