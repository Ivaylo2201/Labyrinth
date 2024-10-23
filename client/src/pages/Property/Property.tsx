import { useNavigate, useParams } from 'react-router-dom';
import useProperty from '../../hooks/useProperty';
import ClipLoader from 'react-spinners/ClipLoader';
import ImageSlider from '../../components/Slider/Slider';
import formatThousands from '../../helpers/formatThousands';
import { capitalize } from '../../helpers/capitalize';
import { getDate } from '../../helpers/getDate';
import Description from '../../components/Description/Description';
import UserProfile from '../../components/UserProfile/UserProfile';
import FeatureList from '../../components/Features-List/FeaturesList';

function Property() {
    const { id } = useParams();
    const navigate = useNavigate();
    const url = `/properties/${id}`;

    const { data: property, isError } = useProperty(url);

    if (isError) {
        navigate('/not-found');
    }

    if (property === undefined) {
        return <ClipLoader size={50} color={'#333333'} />;
    }

    const isForRent: boolean = property.status === 'rent';

    return (
        <div className='flex flex-grow items-center flex-col'>
            <div className='p-4 gap-10 flex flex-col lg:flex-row'>
                <ImageSlider images={property.images} />
                <div className='p-4 gap-3 flex items-center flex-col font-Montserrat text-charcoal'>
                    <p className='text-[#a8a8a8] italic self-start'>Property id: {id}</p>
                    <p className='text-4xl font-bold'>
                        {capitalize(property.type)} in{' '}
                        {property.address.country}
                    </p>
                    <p className='text-xl'>
                        {property.address.city}, {property.address.street}
                    </p>
                    <p className='font-bold text-xl'>
                        {formatThousands(property.price)}€
                        {isForRent ? ' / Month' : ''}
                    </p>
                    <Description text={property.description} />
                    <p className='font-bold'>
                        Posted on: {getDate(property.created_at)}
                    </p>
                    <UserProfile user={property.user} />
                </div>
            </div>

            <FeatureList features={property.features} />
        </div>
    );
}

export default Property;
