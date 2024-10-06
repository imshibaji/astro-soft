export default function Hr({ ...props }: { [key: string]: string | number }) {
    return <div className="flex my-3 justify-center">
        <hr {...props} className={ props.className + " items-center my-3 bg-neutral-200 dark:bg-neutral-700 border-neutral-200 dark:border-neutral-700"} />
    </div>;
}