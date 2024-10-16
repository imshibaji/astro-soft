'use client';
import { useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function NumberInput({ ...props }: { [key: string]: any }) {
    const [value, setValue] = useState(props.defaultValue);
    const onChange = (e: any) => {
        if(parseInt(e.target.value) > props.max || parseInt(e.target.value) < props.min) {
            if(props.max && e.target.value > props.max) {
                e.target.value = props.min;
            }else if(props.min && e.target.value < props.min) {
                e.target.value = props.max;
            }
        }
        setValue(e.target.value);
    }
    return (
        <>
            <div className="relative w-full">
                <input id={"hs-floating-input-"+props.label} className="peer p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600
                    focus:pt-6
                    focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6
                    [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6
                    autofill:pb-2" name={props.name} value={value} type="number" onChange={onChange} />
                <label htmlFor={"hs-floating-input-"+props.label} className="absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent  origin-[0_0] dark:text-nutral-400 peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:scale-90
                    peer-focus:translate-x-0.5
                    peer-focus:-translate-y-1.5
                    peer-focus:text-gray-500 dark:peer-focus:text-neutral-500
                    peer-[:not(:placeholder-shown)]:scale-90
                    peer-[:not(:placeholder-shown)]:translate-x-0.5
                    peer-[:not(:placeholder-shown)]:-translate-y-1.5
                    peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">{props.label}</label>
            </div> 
        </>
    ); 
}