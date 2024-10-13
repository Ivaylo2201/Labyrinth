import { useQuery } from '@tanstack/react-query';
import { Property } from '../types/Property';
import { Axios } from '../helpers/http';

export default function useProperties(url: string) {
    return useQuery({
        queryKey: ['properties', { url }],
        queryFn: async () => {
            const res = await Axios.get<Property[]>(url);
            return res.data;
        },
    });
}
