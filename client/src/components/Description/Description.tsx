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
    );
}

export default Description;
