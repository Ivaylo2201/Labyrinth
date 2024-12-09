import PropertyCard from "../../components/Property-Card/PropertyCard";
import useUserProperties from "../../hooks/useUserProperties";

function UserProperties() {
    const { data: properties, isError, isLoading } = useUserProperties();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (properties === undefined || isError) {
        return <p>Error loading properties</p>;
    }

    if (properties.length === 0) {
        return <p>No properties available</p>;
    }

    return (
        <div
            className={`flex ${
                properties.length === 1 ? 'justify-start' : 'justify-center'
            } items-center border-2`}
        >
            <div className="flex flex-col gap-4 w-full lg:flex-row lg:flex-wrap p-3">
                {properties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        id={property.id}
                        status={property.status}
                        type={property.type}
                        address={property.address}
                        price={property.price}
                        bathrooms={property.bathrooms}
                        bedrooms={property.bedrooms}
                        area={property.area}
                        image={property.image}
                        user={property.user}
                    />
                ))}
            </div>
        </div>
    );
}

export default UserProperties;
