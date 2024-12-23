import type { CorruptionCategory, Document } from "~/types/home";

const defaultQuery = reactive({});

export const corruptionService = {
  getCorruptionCategory: (query = defaultQuery) => {
    return useAPI<CorruptionCategory[]>("/corruptionCategory", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getCorruptionDocument: (query = defaultQuery) => {
    return useAPI<Document[]>(`/corruptionDocument`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
};
