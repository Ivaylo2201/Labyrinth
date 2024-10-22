import { Bath, BedDouble, Expand } from 'lucide-react';
import IconStat from '../Property-Card/IconStat';
import { Property } from '../../types/Property';
import { PropertyDetails } from '../../types/PropertyDetails';

type IconStripProps = {
    property: Property | PropertyDetails;
};

function IconStrip({ property }: IconStripProps) {
    return (
        <div className='flex gap-3'>
            <IconStat LucideIcon={BedDouble} stat={property.bedrooms} />
            <IconStat LucideIcon={Bath} stat={property.bathrooms} />
            <IconStat LucideIcon={Expand} stat={`${property.area} sqm`} />
        </div>
    );
}

export default IconStrip;
