import useSWRImmutable from "swr/immutable";

export const useProjectId = () => {
 
  const { data, mutate } = useSWRImmutable<string | null>(
    "projectId",
    async () => {
      if (typeof window !== "undefined") {
        const value = localStorage.getItem("projectId");
        return value; 
      }
      return null;
    },
    { fallbackData: null }
  );

  const setProjectId = (id: string | null) => {
    if (typeof window === "undefined") return;

    if (id) {
      localStorage.setItem("projectId", id);
    } else {
      localStorage.removeItem("projectId");
    }

    mutate(id, false);
  };

  return { projectId: data, setProjectId };
};
