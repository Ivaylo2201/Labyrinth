type FeatureListProps = {
    features: string[];
};

function FeatureList({ features }: FeatureListProps) {
    return (
        <div className='flex flex-wrap flex-col justify-center items-center gap-4 font-Montserrat lg:pt-0 pb-10'>
            <p className='py-4 text-charcoal text-4xl font-bold'>Features:</p>
            <ul className='w-2/3 flex-wrap flex gap-4 justify-center items-center'>
                {features.map((feature) => (
                    <li className='text-white bg-zinc-900 px-5 py-2 rounded-full'>
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeatureList;
