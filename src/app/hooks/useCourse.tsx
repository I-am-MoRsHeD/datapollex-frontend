
import axiosInstance from './useAxiosInstance';
import { useQuery } from '@tanstack/react-query';

const useCourse = () => {
    const { data: courses = [], refetch, isLoading } = useQuery({
        queryKey: ['courses'],
        queryFn: async () => {
            const res = await axiosInstance.get('/api/course');
            return res?.data?.data;
        },
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
    return { courses, refetch, isLoading };
};

export default useCourse;