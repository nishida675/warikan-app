import useSWRImmutable from "swr/immutable";

export const useProjectId = () => {
  const { data, mutate } = useSWRImmutable<string>("projectId", null);
  return { projectId: data, setProjectId: mutate };
};
