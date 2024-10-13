import { useLocation } from 'react-router-dom';
import useProperties from '../../hooks/useProperties';
import PropertyCard from '../../components/Property-Card/PropertyCard';

function PropertyList() {
    const queryParams = useLocation().search;
    const url = `properties/search/${queryParams}`;

    const { data: properties } = useProperties(url);

    if (properties === undefined) {
        return <p>Loading...</p>;
        // return <Spinner />
    }

    return (
        <div className='flex flex-wrap'>
            {properties.map((p, i) => {
                return (
                    <PropertyCard
                        key={i}
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
