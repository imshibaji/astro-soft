/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Checkbox({ ...props }: { [key: string]: any }) {
    return (
        <>
            <label htmlFor={"hs-vertical-checkbox-in-"+props.label} className="max-w-xs flex items-center px-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                <input {...props} type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id={"hs-vertical-checkbox-in-"+props.label} />
                <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">{props.label}</span>
            </label>
        </>
    )
}