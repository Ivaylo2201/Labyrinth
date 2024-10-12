import { useLocation } from 'react-router-dom';
import useProperties from '../../hooks/useProperties';
import PropertyCard from '../../components/Property-Card/PropertyCard';

function PropertyList() {
    const location = useLocation();
    const url = `properties/search/${location.search}`;

    const { data } = useProperties(url);

    return (
        <div className='flex flex-wrap'>
            {data?.map((p, index) => {
                return (
                    <PropertyCard
                        key={index}
                        id={p.id}
                        status={p.status}
                        type={p.type}
                        address={p.address}
                        price={p.price}
                        bathrooms={p.bathrooms}
                        bedrooms={p.bedrooms}
                        area={p.area}
                        image={p.image}
                    />
                );
            })}
        </div>
    );
}

export default PropertyList;
