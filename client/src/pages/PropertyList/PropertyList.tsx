import { useLocation } from "react-router-dom";
import useProperties from "../../hooks/useProperties";
import PropertyCard from "../../components/Property-Card/PropertyCard";
import { ClipLoader } from "react-spinners";

function PropertyList() {
  const queryParams = useLocation().search;
  const url = `/properties/search${queryParams}`;

  const { data: properties } = useProperties(url);

  if (properties === undefined) {
    return (
      <span className="w-full h-screen flex justify-center items-center">
        <ClipLoader size={200} color={"#333333"} />
      </span>
    );
  }

  return (
    <div
      className={`flex ${
        properties.length === 1 ? "justify-start" : "justify-center"
      } items-center border-2`}
    >
      <div className="flex flex-col gap-4 w-full lg:flex-row lg:flex-wrap p-3">
        {properties.length === 0 ? (
          <p className="text-center text-xl">No properties available</p> // Message when no properties
        ) : (
          properties.map((p, i) => (
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
              user={p.user}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PropertyList;
