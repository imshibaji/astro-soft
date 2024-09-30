/* eslint-disable @typescript-eslint/no-explicit-any */
export default function Input({...props} : { [key: string]: any }) {

    return (
    <>
        <div className="w-full space-y-3">
            <input type={props.type || "text"} {...props} className={ props.className + " py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"} />
        </div>
    </>
    );
}