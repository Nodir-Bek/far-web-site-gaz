import type { IActionStrategy, PaginateObject, UniverType } from "~/types/home";

const defaultQuery = reactive({});
export const GovermentService = {
  getCoordinationOrganDatas: (query = defaultQuery) => {
    return useAPI<PaginateObject[]>("/coordinationOrgan/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getOneCoordinationOrganData: (id: string, query = defaultQuery) => {
    return useAPI<UniverType>(`/coordinationOrgan/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getActionStrategyDatas: (query = defaultQuery) => {
    return useAPI<PaginateObject[]>("/actionStrategy/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getOneactionStrategyData: (id: string, query = defaultQuery) => {
    return useAPI<IActionStrategy>(`/actionStrategy/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
};
