'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableFooter, TableHead, TR, TH, TD } from "./Table";
import { Card, CardBody, CardFooter, CardHeader } from "./Card";
import { archiveData, copyData, createData, deleteData, duplicateData, editData, exportData, printData, selectedData, shareData, unarchiveData, viewData } from "../actions/DataTableActions";



export function DataTable({ title, items, headers, initLimit, limits, footer, children, action, url }: {
    title: string,
    items: any[],
    headers: string[],
    initLimit?: number,
    limits?: number[],
    footer?: React.ReactNode,
    children?: React.ReactNode,
    action?: ActionState,
    url?: string
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState(items);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filtered = items.filter((item) => {
            return Object.keys(item).some((key) => {
                return String(item[key]).toLowerCase().includes(event.target.value.toLowerCase());
            });
        });
        setFilteredItems(filtered);
    }
    const [limit, setLimit] = useState(initLimit ||5);
    const [page, setPage] = useState(1);
    const [currentItems, setCurrentItems] = useState(filteredItems.slice(0, 5));
    const [totalPages, setTotalPages] = useState(Math.ceil(filteredItems.length / limit));
    const [selected, setSelected] = useState<any[]>([]);

    // onclick select all checkbox from table
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelected(filteredItems.map((item) => item.id));
        } else {
            setSelected([]);
        }
    }

    // Onclick Sorted column asc, desc and normal
    const handleSort = (key: string) => {
        const sorted = [...filteredItems].sort((a, b) => {
            if (a[key] < b[key]) {
                return -1;
            }
            if (a[key] > b[key]) {
                return 1;
            }
            return 0;
        });
        setFilteredItems(sorted);
    }
    

    const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(parseInt(event.target.value));
        setPage(1);
    }

    const handlePreviousPage = function () {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPage = function () {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    useEffect(() => {
        setCurrentItems(filteredItems.slice((page - 1) * limit, page * limit));
        setTotalPages(Math.ceil(filteredItems.length / limit));
    }, [filteredItems, page, limit]);

    const handleSelect = (itemData: any) => {
        setSelected(selected.includes(itemData.id) ? selected.filter((id) => id !== itemData.id) : [...selected, itemData.id]); 
        selectedData(itemData, url!)
    }

    return (
        <Card>
            <CardHeader>
                <DataTableHeader
                    title={title}
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    limit={limit}
                    handleLimitChange={handleLimitChange}
                    limits={ limits || [3, 5, 10, 20]}
                />
            </CardHeader>
            <CardBody>
                <DataTableSeletedActions
                    selected={selected}
                    url={url}
                    action={action}
                />
                <hr className="border-gray-200 dark:border-neutral-700 mt-4" />
                <Table>
                    {
                        headers ?
                            <TableHead>
                                {action ? <TH align="center">
                                    Actions
                                </TH> : null}
                                <TD align="center">
                                    <input
                                        className="shrink-0 mt-0.5 border-gray-400 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                        type="checkbox"
                                        checked={selected.length === filteredItems.length}
                                        onChange={handleSelectAll}
                                    />
                                </TD>
                                {
                                    headers.map((header, index) => (
                                        <TH key={index} align="center">
                                           <button className="px-6 py-3 text-xs whitespace-nowrap font-medium text-gray-800 uppercase tracking-wider dark:text-neutral-200" onClick={() => handleSort(header)}>{header.split("_").join(" ")}</button>
                                        </TH>
                                    ))
                                }
                            </TableHead> : null
                    }
                    <TableBody>
                        {
                            children ? children :
                                currentItems.map((itemData, index) => (
                                    <TR 
                                        key={index}
                                        className={selected.includes(itemData.id) ? 'bg-gray-50 dark:bg-neutral-800' : 'hover:bg-gray-50 dark:hover:bg-neutral-800'}
                                        onClick={() => action?.selected ? handleSelect(itemData): null}
                                    >
                                        {action ? <TD align="center">
                                            <DataTableActions item={itemData} url={url ?? ''} action={action} />
                                        </TD> : null}
                                        <TD align="center">
                                            <input
                                                className="shrink-0 mt-0.5 border-gray-400 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                                type="checkbox"
                                                checked={selected.includes(itemData.id)}
                                                onChange={() => setSelected(selected.includes(itemData.id) ? selected.filter((id) => id !== itemData.id) : [...selected, itemData.id])}
                                            />
                                        </TD>
                                        {
                                            headers.map((header, index) => (
                                                <TD key={index} align="left">{itemData[header]}</TD>
                                            ))
                                        }
                                    </TR>
                                ))
                        }
                    </TableBody>
                    {
                        footer ?
                            <TableFooter>
                                {footer}
                            </TableFooter>
                            : null
                    }
                </Table>
            </CardBody>
            <CardFooter>
                <DataTableFooter
                    start={(page - 1) * limit}
                    end={page * limit}
                    total={filteredItems.length}
                    prev={handlePreviousPage}
                    next={handleNextPage}
                />
            </CardFooter>
        </Card>
    );
}






export interface ActionState{
    create?: boolean,
    selected?: boolean,
    view?: boolean,
    edit?: boolean,
    delete?: boolean,
    archive?: boolean,
    unarchive?: boolean,
    copy?: boolean,
    duplicate?: boolean,
    print?: boolean,
    export?: boolean,
    share?: boolean,
}
// Others Components
export function DataTableSeletedActions({
    selected,
    url,
    action,
}: {
    selected: string[],
    action?: ActionState, 
    url?: string
}) {
    return (
        <>
        <div className="flex items-center justify-between gap-2">
        <h3 className="pl-2 text-lg font-bold text-gray-800 dark:text-white">
            {selected.length || 'No'} selected
        </h3>
        <div className="flex items-center justify-end gap-2">
            {selected.length > 0 ?
            <div className="pl-2 flex items-center justify-start gap-2">
                { action && action!.archive ? <button onClick={() => archiveData(selected, url!)} className="inline-flex items-center gap-x-1 text-teal-500 text-sm hover:text-teal-700 px-4 py-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path d="M64 164v244a56 56 0 0 0 56 56h272a56 56 0 0 0 56-56V164a4 4 0 0 0-4-4H68a4 4 0 0 0-4 4zm267 151.63l-63.69 63.68a16 16 0 0 1-22.62 0L181 315.63c-6.09-6.09-6.65-16-.85-22.38a16 16 0 0 1 23.16-.56L240 329.37V224.45c0-8.61 6.62-16 15.23-16.43A16 16 0 0 1 272 224v105.37l36.69-36.68a16 16 0 0 1 23.16.56c5.8 6.37 5.24 16.29-.85 22.38z" fill="currentColor"></path><rect x="32" y="48" width="448" height="80" rx="32" ry="32" fill="currentColor"></rect></svg>
                    Archive
                </button>: null}
                { action && action!.unarchive ? <button onClick={() => unarchiveData(selected, url!)} className="inline-flex items-center gap-x-1 text-teal-500 text-sm hover:text-teal-700 px-4 py-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M20.55 5.22l-1.39-1.68A1.51 1.51 0 0 0 18 3H6c-.47 0-.88.21-1.15.55L3.46 5.22C3.17 5.57 3 6.01 3 6.5V19a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6.5c0-.49-.17-.93-.45-1.28zm-8.2 4.63L17.5 15H14v2h-4v-2H6.5l5.15-5.15c.19-.19.51-.19.7 0zM5.12 5l.82-1h12l.93 1H5.12z" fill="currentColor"></path></svg>
                    Unarchive
                </button>: null}
                { action && action!.delete ? <button onClick={() => deleteData(selected, url!)} className="inline-flex items-center gap-x-1 text-red-500 text-sm hover:text-red-700 px-4 py-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><g fill="none"><path d="M10 1.25a2.75 2.75 0 0 1 2.739 2.5H17a.75.75 0 0 1 .102 1.493L17 5.25h-.583L15.15 16.23A2 2 0 0 1 13.163 18H6.837a2 2 0 0 1-1.987-1.77L3.582 5.25H3a.75.75 0 0 1-.743-.648L2.25 4.5a.75.75 0 0 1 .648-.743L3 3.75h4.261A2.75 2.75 0 0 1 10 1.25zM8.5 7.5c-.245 0-.45.155-.492.359L8 7.938v6.125l.008.078c.042.204.247.359.492.359s.45-.155.492-.359L9 14.062V7.939l-.008-.08C8.95 7.656 8.745 7.5 8.5 7.5zm3 0c-.245 0-.45.155-.492.359L11 7.938v6.125l.008.078c.042.204.247.359.492.359s.45-.155.492-.359l.008-.079V7.939l-.008-.08c-.042-.203-.247-.358-.492-.358zM10 2.75c-.605 0-1.11.43-1.225 1h2.45c-.116-.57-.62-1-1.225-1z" fill="currentColor"></path></g></svg>
                    Delete
                </button>: null}
                { action && action!.copy ? <button onClick={() => copyData(selected, url!)} className="inline-flex items-center gap-x-1 text-green-500 text-sm hover:text-green-700 px-4 py-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path opacity=".3" d="M8 7h11v14H8z" fill="currentColor"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"></path></svg>
                    Copy
                </button>: null}
                { action && action!.duplicate ? <button onClick={() => duplicateData(selected, url!)} className="inline-flex items-center gap-x-1 text-green-500 text-sm hover:text-green-700 px-4 py-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path opacity=".3" d="M15 5c-3.86 0-7 3.14-7 7s3.14 7 7 7s7-3.14 7-7s-3.14-7-7-7zm4 8h-3v3h-2v-3h-3v-2h3V8h2v3h3v2z" fill="currentColor"></path><path d="M16 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zm-1-5c-4.96 0-9 4.04-9 9s4.04 9 9 9s9-4.04 9-9s-4.04-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7zM2 12c0-2.79 1.64-5.2 4.01-6.32V3.52C2.52 4.76 0 8.09 0 12s2.52 7.24 6.01 8.48v-2.16A6.99 6.99 0 0 1 2 12z" fill="currentColor"></path></svg>
                    Duplicate
                </button>: null}
                { action && action?.print ? <button onClick={() => printData(selected, url!)} className="inline-flex items-center gap-x-1 text-green-500 text-sm hover:text-green-700 px-4 py-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M18 7V4c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1v3h12zm1 1H5c-1.66 0-3 1.34-3 3v5c0 .55.45 1 1 1h3v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2h3c.55 0 1-.45 1-1v-5c0-1.66-1.34-3-3-3zm-3 11H8v-4h8v4zm2-6.5c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z" fill="currentColor"></path></svg>
                    Print
                </button>: null}
                { action && action!.export ? <button onClick={() => exportData(selected, url!)} className="inline-flex items-center gap-x-1 text-green-500 text-sm hover:text-green-700 px-4 py-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M11.5 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7.5M4 10h16M10 4v16m4-1h7m-3-3l3 3l-3 3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    Export
                </button>: null}
                { action && action!.share ? <button onClick={() => shareData(selected, url!)} className="inline-flex items-center gap-x-1 text-green-500 text-sm hover:text-green-700 px-4 py-1 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="6" r="3"></circle><circle cx="18" cy="18" r="3"></circle><path d="M8.7 10.7l6.6-3.4"></path><path d="M8.7 13.3l6.6 3.4"></path></g></svg>
                    Share
                </button>: null}
            </div>: null}
            { action && action!.create ? <button className="inline-flex items-center gap-x-1 text-blue-500 text-sm hover:text-blue-700 px-4 py-1 rounded" onClick={() => createData(selected, url!)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path opacity=".3" d="M11.17 8l-.59-.59L9.17 6H4v12h16V8h-8.83zM14 10h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2z" fill="currentColor"></path><path d="M20 6h-8l-2-2H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 12H4V6h5.17l1.41 1.41l.59.59H20v10zm-8-4h2v2h2v-2h2v-2h-2v-2h-2v2h-2z" fill="currentColor"></path></svg>
                Create New
            </button>: null}
        </div>
    </div>
</>);
}

export function DataTableHeader({ title, searchTerm, handleSearch, limit, handleLimitChange, limits = [5, 10, 20] }: {
    title: string,
    searchTerm: string,
    handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
    limit: number,
    handleLimitChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    limits?: number[]
}) {
    return (
        <div className="flex items-center justify-between">
            <h3 className="text-lg pl-1 sm:pl-2 font-medium text-gray-800 dark:text-neutral-200">
                {title}
            </h3>
            <div className="flex gap-2">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                        <svg className="shrink-0 size-4 text-gray-400 dark:text-white/60" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </svg>
                    </div>
                    <input value={searchTerm} onChange={handleSearch} type="text" className="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search ..." />
                </div>
                <select value={limit} onChange={handleLimitChange} className="py-3 px-4 pe-9 block w-20 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                    {limits.map((l,i) => <option key={i} value={l}>{l}</option>) }
                </select>
            </div>
        </div>
    )
}

export function DataTableFooter({ start, end, total, prev, next }: {
    start: number,
    end: number,
    total: number,
    prev: () => void,
    next: () => void
}) {
    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-neutral-400">
                Showing <span className="font-medium">{start}</span> to <span className="font-medium">{end}</span> of <span className="font-medium">{total}</span> results
            </p>
            <div className="flex gap-2">
                <button onClick={() => prev()} className="flex items-center justify-center w-8 h-8 text-gray-500 transition-colors duration-200 rounded-full hover:bg-gray-100">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                </button>
                <button onClick={() => next()} className="flex items-center justify-center w-8 h-8 text-gray-500 transition-colors duration-200 rounded-full hover:bg-gray-100">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export function DataTableActions({ item, url, action }: { 
    item: any,
    url: string,
    action?: ActionState
}) {
    return (
        <div className="flex justify-center space-x-0">
            <div className="flex gap-0">
                { action!.view ? <button title="View" className="py-3 px-3 inline-flex items-center gap-x-0 text-sm font-medium rounded-lg border border-transparent text-teal-500 hover:bg-teal-100 focus:outline-none focus:bg-teal-100 hover:text-teal-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-teal-800/30 dark:hover:text-teal-400 dark:focus:text-teal-400"
                    onClick={() => viewData(item, url)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><circle cx="22" cy="24" r="2" fill="currentColor"></circle><path d="M29.777 23.479A8.64 8.64 0 0 0 22 18a8.64 8.64 0 0 0-7.777 5.479L14 24l.223.521A8.64 8.64 0 0 0 22 30a8.64 8.64 0 0 0 7.777-5.479L30 24zM22 28a4 4 0 1 1 4-4a4.005 4.005 0 0 1-4 4z" fill="currentColor"></path><path d="M7 17h5v2H7z" fill="currentColor"></path><path d="M7 12h12v2H7z" fill="currentColor"></path><path d="M7 7h12v2H7z" fill="currentColor"></path><path d="M22 2H4a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h8v-2H4V4h18v11h2V4a2.006 2.006 0 0 0-2-2z" fill="currentColor"></path></svg>
                </button>: null}
                { action!.edit ? <button title="Edit" className="py-3 px-3 inline-flex items-center gap-x-0 text-sm font-bold rounded-lg border border-transparent text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:bg-yellow-100 hover:text-yellow-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-yellow-800/30 dark:hover:text-yellow-400 dark:focus:bg-yellow-800/30 dark:focus:text-yellow-400"
                    onClick={() => editData(item, url)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path d="M20 4.746a2.75 2.75 0 0 0-2.75-2.75H4.75A2.75 2.75 0 0 0 2 4.746v12.5a2.75 2.75 0 0 0 2.75 2.75h6.666l.105-.42c.096-.384.253-.748.463-1.08H4.75c-.69 0-1.25-.56-1.25-1.25v-12.5c0-.69.56-1.25 1.25-1.25h12.5c.69 0 1.25.56 1.25 1.25v7.113c.437-.4.956-.66 1.5-.781V4.746zm-4 9.608V6.73l-.007-.1A.744.744 0 0 0 15.25 6a.74.74 0 0 0-.75.73v8.541l.007.099c.017.125.067.24.142.337L16 14.355zm-8.507-5.71A.75.75 0 0 0 6.75 8a.748.748 0 0 0-.75.747v6.507l.007.101c.05.365.363.645.743.645c.414 0 .75-.334.75-.746V8.746l-.007-.101zm4.214 2.973a.73.73 0 0 0-.732-.62a.73.73 0 0 0-.725.733l.035 3.547l.008.099a.731.731 0 0 0 .732.62a.73.73 0 0 0 .725-.733l-.035-3.548l-.008-.098zm7.393 1.052l-5.903 5.902a2.686 2.686 0 0 0-.706 1.248l-.458 1.83a1.087 1.087 0 0 0 1.319 1.319l1.83-.458a2.685 2.685 0 0 0 1.248-.706l5.902-5.903A2.286 2.286 0 0 0 19.1 12.67z" fill="currentColor"></path></g></svg>
                </button>: null}
                { action!.delete ? <button title="Delete" className="py-3 px-3 inline-flex items-center gap-x-0 text-sm font-bold rounded-lg border border-transparent text-red-500 hover:bg-red-100 focus:outline-none focus:bg-red-100 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-red-800/30 dark:hover:text-red-400 dark:focus:bg-red-800/30 dark:focus:text-red-400"
                    onClick={() => deleteData(item, url)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none"><path d="M24 6.75a6.25 6.25 0 0 1 6.246 6.02l.004.231L37 13a1.75 1.75 0 0 1 .144 3.494L37 16.5h-1.167l-1.627 21.57A4.25 4.25 0 0 1 29.968 42H18.032a4.25 4.25 0 0 1-4.238-3.93L12.166 16.5H11a1.75 1.75 0 0 1-1.744-1.607l-.006-.143a1.75 1.75 0 0 1 1.607-1.744L11 13h6.75c0-3.298 2.555-6 5.794-6.234l.227-.012L24 6.75zm3.75 13a1.25 1.25 0 0 0-1.244 1.122L26.5 21v12l.006.128a1.25 1.25 0 0 0 2.488 0L29 33V21l-.006-.128a1.25 1.25 0 0 0-1.244-1.122zm-7.5 0a1.25 1.25 0 0 0-1.244 1.122L19 21v12l.006.128a1.25 1.25 0 0 0 2.488 0L21.5 33V21l-.006-.128a1.25 1.25 0 0 0-1.244-1.122zm3.918-9.495L24 10.25a2.75 2.75 0 0 0-2.745 2.582l-.005.169l5.5-.001a2.75 2.75 0 0 0-2.582-2.745z" fill="currentColor"></path></g></svg>
                </button>: null}
            </div>
        </div>
    )
}