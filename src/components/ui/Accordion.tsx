interface AccordionData {
    title: string,
    content: React.ReactNode
    children?: AccordionData[]
}

export function DataAccordion({ datas }: { datas: AccordionData[] }) {

    return (<>
        <Accordion>
            {
                datas.map((item, index) => {
                    if (item.children) {
                        return (
                            <AccordionBody key={index}>
                                <AccordionButton>{item.title}</AccordionButton>
                                <AccordionContent>
                                    <DataAccordion datas={item.children} />
                                </AccordionContent>
                            </AccordionBody>
                        )
                    }
                    return (
                        <AccordionBody key={index}>
                            <AccordionButton>{item.title}</AccordionButton>
                            <AccordionContent>{item.content}</AccordionContent>
                        </AccordionBody>
                    )
                })
            }
        </Accordion>
    </>);
}

export function Accordion({ children }: { children: React.ReactNode }) {
    return (<>
        <div className="hs-accordion-group border border-gray-200 dark:border-neutral-700 rounded-lg overflow-hidden">
           { children }
        </div>
    </>);
}

export function AccordionBody({ children }: { children: React.ReactNode }) {
    return (
        <div className="hs-accordion hs-accordion-active:border-gray-200 bg-white border-[0.5px] border-transparent rounded-sm dark:hs-accordion-active:border-neutral-700 dark:bg-neutral-800 dark:border-transparent">
            { children}
        </div>
    )
}

export function AccordionButton({ children }: { children: React.ReactNode }) {
    return (
        <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 py-4 px-5 hover:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:outline-none dark:focus:text-neutral-400">
            {children}
            <svg className="hs-accordion-active:hidden block size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
            </svg>
            <svg className="hs-accordion-active:block hidden size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
            </svg>
        </button>
    )
}

export function AccordionContent({children }: { children: React.ReactNode }) {
    return (
        <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-active-bordered-heading-one">
            <div className="pb-4 px-5">
                <div className="text-gray-800 dark:text-neutral-200">
                    { children }
                </div>
            </div>
        </div>
    )
}
