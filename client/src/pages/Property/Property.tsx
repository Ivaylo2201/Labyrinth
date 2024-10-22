import { useParams } from 'react-router-dom';
import useProperty from '../../hooks/useProperty';
import ClipLoader from 'react-spinners/ClipLoader';
import ImageSlider from '../../components/Slider/Slider';
import formatThousands from '../../helpers/formatThousands';
import IconStat from '../../components/Property-Card/IconStat';
import { Bath, BedDouble, Expand } from 'lucide-react';
import IconStrip from '../../components/IconStrip/IconStrip';
import { capitalize } from '../../helpers/capitalize';
import { getDate } from '../../helpers/getDate';
import Description from '../../components/Description/Description';
import UserProfile from '../../components/UserProfile/UserProfile';

function Property() {
    const { id } = useParams();
    const url = `/properties/${id}`;

    const { data: property } = useProperty(url);

    if (property === undefined) {
        return <ClipLoader size={50} color={'#333333'} />;
    }

    const imageUrl: string = `http://127.0.0.1:8000/storage/${property.images[0]}`;

    console.log(property);

    const isForRent: boolean = property.status === 'rent';

    // Transform timestamp using:
    // new Date(property.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

    // TODO: Finish design
    // <ImageSlider images={property.images} />
    return (
        <div className='flex justify-center items-center flex-col'>
            <div className='p-4 gap-10 flex flex-col lg:flex-row'>
                <ImageSlider images={property.images} />
                <div className='p-4 gap-3 flex items-center flex-col font-Montserrat text-charcoal'>
                    <p className='text-4xl font-bold'>{capitalize(property.type)} in {property.address.country}</p>
                    <p className='text-xl'>{property.address.city}, {property.address.street}</p>
                    <p className='font-bold text-xl'>{formatThousands(property.price)}€{isForRent ? ' / Month' : ''}</p>
                    <Description text={`This 4-bedroom, 3-bath home offers an open layout, modern kitchen, and a cozy backyard. The master suite has an en-suite bath, and it's located in a quiet, family-friendly area`} />
                    <p className='font-bold'>Posted on: {getDate(property.created_at)}</p>
                    <UserProfile user={property.user} />
                </div>
            </div>
        </div>
    );
}

export default Property;
