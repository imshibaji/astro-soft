/* eslint-disable @typescript-eslint/no-explicit-any */
export default function InputGroup({ label, input1, input2, checkBox }: { 
    label: string,
    input1?: {
        [key: string]: any
    },
    input2?: {
        [key: string]: any
    },
    checkBox?: {
        [key: string]: any,
    }
}) {
    return (
        <div>
            <div className="sm:flex rounded-lg shadow-sm">
                <span className="py-3 px-4 inline-flex items-center min-w-fit w-full border border-gray-200 bg-gray-50 text-sm text-gray-500 -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:w-auto sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg dark:bg-neutral-700 dark:border-neutral-700 dark:text-neutral-400">{label}</span>
                <input { ...input1}  type="text" className="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                <input { ...input2} type="text" className="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
                <label htmlFor={"hs-vertical-checkbox-in-"+checkBox!.label} className="block sm:flex items-center py-3 px-5 sm:px-5 sm:py-3 shadow-sm -mt-px -ms-px border border-gray-200 dark:border-neutral-700 bg-gray-50 text-sm first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg focus:ring-blue-600 focus:border-blue-600 dark:text-neutral-500 dark:bg-neutral-800">
                    <input {...checkBox} id={"hs-vertical-checkbox-in-"+checkBox!.label} type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                    <span className="text-sm text-gray-500 ms-3 dark:text-neutral-400">{checkBox!.label}</span>
                </label>
            </div>
        </div>
    );
}