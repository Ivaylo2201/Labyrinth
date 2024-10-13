import { useLocation } from 'react-router-dom';
import useProperties from '../../hooks/useProperties';
import PropertyCard from '../../components/Property-Card/PropertyCard';

function PropertyList() {
    const queryParams = useLocation().search;
    const url = `properties/search/${queryParams}`;

    const { data, isLoading } = useProperties(url);

    return (
        <div className='flex flex-wrap'>
            {isLoading ? (
                // замени със спинър или нещо там нз
                <p>Loading...</p>
            ) : (
                data?.map((p, index) => {
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
                })
            )}
        </div>
    );
}

export default PropertyList;
