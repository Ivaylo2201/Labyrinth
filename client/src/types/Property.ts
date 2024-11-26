import { Address } from "./Address";

export type Property = {
  id: number;
  status: string;
  type: string;
  address: Address;
  price: number;
  bathrooms: number;
  bedrooms: number;
  area: number;
  image: string;
  user: {
    id: number;
    email: string;
    username: string;
    phone_number: string;
    location?: string;
    role: string;
  };
};
