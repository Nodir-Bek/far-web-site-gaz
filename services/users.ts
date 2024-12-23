import type { IRegions, PaginateObject, User } from "~/types/home";

const defaultQuery = reactive({});

export const UserService = {
  getAll: (query = defaultQuery) => {
    return useAPI<User[]>("/users", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getAllWithPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/users/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOneByRegionId: (id: string, query = defaultQuery) => {
    return useAPI<IRegions>(`/users/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
};
