import React from "react";
import Image from "next/image";

export function Card({children}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            {children}
        </div>
    )
}

export function CardImage({ src, alt }: { src: string, alt: string }) {
    return (
        <Image className="w-full h-auto rounded-t-xl" src={src} alt={alt} />
    )
}

export function CardBody({ children , standalone=false }: { children: React.ReactNode, standalone?: boolean }) {
    const standaloneClass = standalone ? 'rounded-xl border border-gray-200 dark:border-neutral-700' : 'rounded-none';
    return (
        <div className={`flex flex-col bg-white shadow-sm p-2 md:p-5 dark:bg-neutral-900 dark:text-neutral-400 ${standaloneClass}`}>
            {children}
        </div>
    )
}

export function CardHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-100 border-b rounded-t-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
            {children}
        </div>
    )
}

export function CardTitle({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {children}
        </h3>
    )
}

export function CardFooter({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-gray-100 border-t rounded-b-xl py-3 px-4 md:py-4 md:px-5 dark:bg-neutral-900 dark:border-neutral-700">
            {children}
        </div>
    )
}