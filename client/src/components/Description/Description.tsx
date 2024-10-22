type DescriptionProps = {
    text: string;
};

function Description({ text }: DescriptionProps) {
    return (
        <div className='w-80 my-5'>
            <hr className="bg-charcoal w-full h-[1px]" />
            <p className='my-5'>{text}</p>
            <hr className='bg-charcoal w-full h-[1px]' />
        </div>

        // <div className="w-4/5 flex flex-col my-5">
        //     <div className='bg-light-charcoal w-full h-[1px]'></div>
        //     <div className='bg-green-500 w-4/5 h-40 my-5'>
        //         <p className='break-all'>{text}</p>
        //     </div>
        //     <div className='bg-light-charcoal w-full h-[1px]'></div>
        // </div>
    );
}

export default Description;
