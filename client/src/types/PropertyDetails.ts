import { Address } from "./Address";
import { User } from "./User";

export type PropertyDetails = {
    id: number;
    status: string,
    type: string,
    address: Address,
    price: number;
    bathrooms: number;
    bedrooms: number;
    area: number;
    description: string;
    images: string[];
    features: string[];
    created_at: string;
    user: User;
}