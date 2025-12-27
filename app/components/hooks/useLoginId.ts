import useSWRImmutable from "swr/immutable"

export const useLoginId = () => {
    const {data, mutate} = useSWRImmutable<string>("id", null);
    return { loginId : data, setLoginId : mutate };
}