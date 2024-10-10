import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PropertyCardProps } from '../components/Property-Card/PropertyCard';

export default function useProperties(url: string) {
    return useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            const res = await axios.get<PropertyCardProps[]>(url);
            return res.data;
        },
    });
}
