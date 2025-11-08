import useSWR from "swr";
import { fetcher } from "@/app/lib/utils";


export const useFetcher = <T>(url: string, id?: string) => {
    const { data, isLoading, error, mutate } = useSWR<T>(
        id ? `${url}/${id}` : url,
        fetcher
    );
    return { fetchData : data, isLoading, error, mutate };
}