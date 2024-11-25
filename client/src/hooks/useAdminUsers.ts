import { useQuery } from '@tanstack/react-query';
import { Property } from '../types/Property';
import { Axios } from '../helpers/http';

export default function useAdminUsers() {
    return useQuery({
        queryKey: ['adminUsers'],
        queryFn: async () => {
            const token = localStorage.getItem('token');
            const res = await Axios.get<Property[]>("/admin/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });;
            return res.data;
        },
    });
}