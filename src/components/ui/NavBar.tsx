"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface Menu {
    name: string;
    link: string;
    icon?: string;
    children?: Menu[];
}

export default function NavBar({ title, menus, logo }: { title: string, menus: Menu[], logo?: string }) {
    return (
        <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-orange-600 text-sm py-3 dark:bg-neutral-800">
            <nav className="container mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center justify-between">
                    <Brand title={title} icon={logo} />
                    <ToggleButton />
                </div>
                <div id="hs-navbar-example" className="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block" aria-labelledby="hs-navbar-example-collapse">
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                        {
                            menus.map((menu, index) => menu.children ?
                                <NavDropdown key={index} menu={menu} />
                                : <NavItem key={index} menu={menu} />)
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export function Brand({ title, icon }: { title: string, icon?: string }) {
    return (
        <Link
            className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80"
            href="/" aria-label="Brand">
            {
                icon ? 
                <span className="inline-flex items-center gap-x-2 text-xl font-semibold">
                    <Image className="w-10 h-auto" src={icon} alt={title} width={32} height={32} />
                    {title}
                </span> : title
            }
        </Link>
    )
}

export function ToggleButton() {
    return (
        <div className="sm:hidden">
            <button type="button" className="hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" id="hs-navbar-example-collapse" aria-expanded="false" aria-controls="hs-navbar-example" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-example">
                <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                <span className="sr-only">Toggle navigation</span>
            </button>
        </div>
    )
}

export function NavItem({ menu }: { menu: Menu }) {
    const pathname = usePathname();
    return (
        <Link
            className={"font-bold text-white hover:text-gray-200 focus:outline-none focus:text-yellow-200 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"+ (pathname === menu.link ? " text-yellow-200" : "")}
            href={menu.link}
        >
            {menu.name}
        </Link>
    )
}

export function NavDropdown({ menu }: { menu: Menu }) {
    return (
        <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] ">
            <button id="hs-navbar-example-dropdown" type="button" className="hs-dropdown-toggle flex items-center w-full text-white hover:text-gray-200 focus:outline-none focus:text-yellow-200 font-bold dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500" aria-haspopup="menu" aria-expanded="false" aria-label="Mega Menu">
                <span>{menu.name}</span>
                <svg className="hs-dropdown-open:-rotate-180 sm:hs-dropdown-open:rotate-0 duration-300 ms-1 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </button>
            <div className="hs-dropdown-menu transition-[opacity,margin] ease-in-out duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-50 bg-white sm:shadow-md rounded-lg p-1 space-y-1 dark:bg-neutral-800 sm:dark:border dark:border-neutral-700 dark:divide-neutral-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5 hidden" role="menu" aria-orientation="vertical" aria-labelledby="hs-navbar-example-dropdown">
                {
                    menu.children?.map((m, i) => m.children ?
                        <DropdownMenu key={i} menu={m} /> : <SubMenu key={i} menu={m} />)
                }
            </div>
        </div>
    )
}

export function SubMenu({ menu }: { menu: Menu }) {
    return (
        <Link
            className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
            href={menu.link}
        >
            <span>{menu.name}</span>
        </Link>
    )
}

export function DropdownMenu({ menu }: { menu: Menu }) {
    return (
        <div className="hs-dropdown [--strategy:static] sm:[--strategy:absolute] [--adaptive:none] relative">
            <button id="hs-navbar-example-dropdown-sub" type="button" className="hs-dropdown-toggle w-full flex justify-between items-center text-sm text-gray-800 rounded-lg py-2 px-3 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300">
                <span>{menu.name}</span>
                <svg className="hs-dropdown-open:-rotate-180 sm:hs-dropdown-open:-rotate-90 sm:-rotate-90 duration-300 ms-2 shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </button>

            <div className="hs-dropdown-menu transition-[opacity,margin] ease-in-out duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-50 sm:mt-2 bg-white sm:shadow-md rounded-lg dark:bg-neutral-800 sm:dark:border dark:border-neutral-700 dark:divide-neutral-700 before:absolute sm:border before:-end-5 before:top-0 before:h-full before:w-5 sm:!mx-[10px] top-0 end-full" role="menu" aria-orientation="vertical" aria-labelledby="hs-navbar-example-dropdown-sub">
                <div className="p-1 space-y-1">
                    {
                        menu.children?.map((mm, ii) => <SubMenu key={ii} menu={mm} />)
                    }
                </div>
            </div>
        </div>
    )
}