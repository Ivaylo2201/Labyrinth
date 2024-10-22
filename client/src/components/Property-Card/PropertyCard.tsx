import { Bath, BedDouble, Expand } from "lucide-react";
import IconStat from "./IconStat";
import { Property } from "../../types/Property";
import { useNavigate } from "react-router-dom";
import formatThousands from "../../helpers/formatThousands";

function PropertyCard(props: Property): JSX.Element {
  const imageUrl: string = `http://127.0.0.1:8000/storage/${props.image}`;

  const isForRent: boolean = props.status === "rent";
  const navigate = useNavigate();

  return (
    <article className="w-full lg:w-64 bg-white inline-flex flex-col overflow-hidden shadow-sm shadow-black rounded-md ">
      <img src={imageUrl} className="h-48 object-cover" alt="Property image" />
      <div className="font-Montserrat p-3 flex flex-col gap-1">
        <h1 className="text-theme-blue font-bold uppercase">{props.type}</h1>
        <h1 className="text-xl">
          {formatThousands(props.price)}€ {isForRent ? " / Month" : ""}
        </h1>
        <h1 className="text-light-charcoal overflow-hidden text-ellipsis whitespace-nowrap">
          {props.address.city}, {props.address.street}
        </h1>
      </div>
      <div className="font-Montserrat border-y border-gray-300 flex justify-center gap-3 py-2">
        <IconStat LucideIcon={BedDouble} stat={props.bedrooms} />
        <IconStat LucideIcon={Bath} stat={props.bathrooms} />
        <IconStat LucideIcon={Expand} stat={`${props.area} sqm`} />
      </div>
      <div className="py-5 flex justify-center px-4">
        <button
          onClick={() => navigate(`/property/${props.id}`)}
          className="w-full lg:w-auto font-Montserrat bg-charcoal hover:bg-light-charcoal duration-150 px-10 py-3 rounded-full text-white"
        >
          Details
        </button>
      </div>
    </article>
  );
}

export default PropertyCard;
