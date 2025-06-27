
import axiosInstance from './useAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const useModule = (id?: string) => {
    const { data: modules = [], refetch, isLoading } = useQuery({
        queryKey: ['modules'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/course/${id}/modules`);
            return res?.data?.data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
    return { modules, refetch, isLoading };
};

export default useModule;