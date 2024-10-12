type IconStatProps = {
    LucideIcon: React.ElementType;
    stat: number | string;
};

function IconStat({ LucideIcon, stat }: IconStatProps) {
    return (
        <div className='flex gap-2 items-center'>
            <span className='text-light-charcoal'>
                <LucideIcon />
            </span>
            <span className="text-black">
                {stat}
            </span>
        </div>
    );
}

export default IconStat;
