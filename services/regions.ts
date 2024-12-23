import type { IRegions, PaginateObject, UniverType } from "~/types/home";

const defaultQuery = reactive({});

export const RegionsService = {
  getAll: (query = defaultQuery) => {
    return useAPI<IRegions[]>("/regions", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getAllWithPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/regions/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOne: (id: string, query = defaultQuery) => {
    return useAPI<IRegions>(`/regions/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
};
