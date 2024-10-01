/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TextArea({ ...props }: { [key: string]: any }) {
    return (
        <>
            <textarea {...props} className={ props.className + " w-full px-4 py-3 text-sm border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"}>
                {props.children}
            </textarea>
        </>
    );
}