
import axiosInstance from './useAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const useLectures = (id?: string) => {
    const { data: lectures = [], refetch, isLoading } = useQuery({
        queryKey: ['lectures'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/api/module/${id}/lectures`);
            return res?.data?.data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
    return { lectures, refetch, isLoading };
};

export default useLectures;