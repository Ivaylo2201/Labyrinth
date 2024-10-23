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
    <div className="flex justify-center items-center border-2">
      {/* <div className="flex flex-row p-2  flex-wrap gap-4"> */}
      <div className="flex flex-col gap-4 w-full p-4 lg:flex-row lg:flex-wrap">
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
    </div>
  );
}

export default PropertyList;
