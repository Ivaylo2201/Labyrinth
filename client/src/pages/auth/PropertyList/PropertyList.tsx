import { useLocation } from 'react-router-dom';
import useProperties from '../../../hooks/useProperties';
import PropertyCard from '../../../components/Property-Card/PropertyCard';

function PropertyList() {
    const location = useLocation();
    const url = `http://127.0.0.1:8000/api/properties/search/${location.search}`;

    const { data } = useProperties(url);

    return (
        <div className='flex'>
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
