const Spinner = ({ className }: { className: string }) => {
    return (
        <div
            className={`inline-block ${className} animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]`}
            role='status'
        >
            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                Loading...
            </span>
        </div>
    );
};
export default Spinner;