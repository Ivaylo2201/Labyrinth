import { useQuery } from '@tanstack/react-query';
import { Property } from '../types/Property';
import { Axios } from '../helpers/http';
import axios from 'axios';

export default function useUserProperties() {
    return useQuery({
        queryKey: ['profile_properties'],
        queryFn: async () => {
            const res = await Axios.get<Property[]>('/profile/properties', { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
            return res.data;
        },
    });
}
