import { useQuery } from "@tanstack/react-query";
import { PropertyDetails } from "../types/PropertyDetails";
import { Axios } from "../helpers/http";

export default function useProperty(url: string) {
    return useQuery({
        queryKey: ['property'],
        queryFn: async () => {
            const res = await Axios.get<PropertyDetails>(url);
            return res.data;
        },
    });
}