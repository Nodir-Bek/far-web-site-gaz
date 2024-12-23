import { useAPI } from "~/composables/useApi";
import type {
  IDynamicMenuSchema,
  Media,
  PaginateObject,
  UniverType,
  YearNames,
} from "~/types/home";

// get qilingan ma'lumot modeliga qarab kerakli typelarni yozamiz
export interface DinamikObject {
  [key: string]: any;
}

const defaultQuery = reactive({});

// select inputlar va istalgan holatda dinamik url orqali ma'lumot olish
export const getData = (slug: string, query = defaultQuery) => {
  return useAPI<DinamikObject[]>(`/${slug}`, {
    query: query,
    watch: [query],
    server: true,
  });
};

// --- boshqa methodlar uchun ----
// export const createData = (body: kerakliType) => {
// 	return useAPI<DinamikObject>('/path', { method: 'POST', body: body });
// };

// export const updateData = (slug: string, body: kerakliType) => {
// 	return useAPI<DinamikObject>(`/path/${slug}`, { method: 'PUT', body: body });
// };

// export const deleteData = (slug: string) => {
// 	return useAPI<object>(`/path/${slug}?cache=false`, { method: 'DELETE' });
// };

// homedagi barcha sectionlarga quyidagi servicelarni qo'shib chiqdim, backdagi path aniq bo'lsa pathni o'zgartiramiz dinamikObjectni o'rniga kerakli typelarni qoyamiz
export const getNewsCategory = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/newsCategory", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getDocumentCategory = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/documentCategory", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getOpenDatas = (query = defaultQuery) => {
  return useAPI<PaginateObject>("/opendatas/paginate", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getRegulatoryDocument = (query = defaultQuery) => {
  return useAPI<PaginateObject>("/regulatoryDocument/paginate", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getHero = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/hero", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getNews = (query = defaultQuery) => {
  return useAPI<UniverType[]>("/news", {
    query: query,
    watch: [query],
    server: true,
  });
};
export const getNewsPaginate = (query = defaultQuery) => {
  return useAPI<PaginateObject>("/news/paginate", {
    query: query,
    watch: [query],
    server: true,
  });
};
export const getNewsById = (id: string, query = defaultQuery) => {
  return useAPI<UniverType[]>(`/news/${id}`, {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getPostersPaginate = (query = defaultQuery) => {
  return useAPI<PaginateObject>("/posters/paginate", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getDocuments = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/documents", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getMapData = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/mapData", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getInvestitsionState = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/investitsion", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getCityOffNumbers = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/city-off-numbers", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getGallaryImages = (query = defaultQuery) => {
  return useAPI<Media[]>("/photoMedias", {
    query: query,
    watch: [query],
    server: true,
  });
};
export const getGallaryImagesPaginate = (query = defaultQuery) => {
  return useAPI<PaginateObject>("/photomedias/paginate", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getGallaryVideos = (query = defaultQuery) => {
  return useAPI<Media[]>("/videoMedias", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getGallaryVideosPaginate = (query = defaultQuery) => {
  return useAPI<PaginateObject>("/videoMedias/paginate", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getUsefullLinks = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/usefull-links", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getFooter = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/footer", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getCurrentYearName = (query = defaultQuery) => {
  return useAPI<YearNames[]>("/yearNames", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getDynamicMenu = (query = defaultQuery) => {
  return useAPI<IDynamicMenuSchema[]>("/menus", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getOneDynamicMenu = (id: string, query = defaultQuery) => {
  return useAPI<IDynamicMenuSchema>(`/menus/${id}`, {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getAllYearNames = (query = defaultQuery) => {
  return useAPI<YearNames[]>("/yearNames", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getDepartmentById = (id: string, query = defaultQuery) => {
  return useAPI<UniverType[]>(`/maps/${id}`, {
    query: query,
    watch: [query],
    server: true,
  });
};
export const getAllDepartments = (query = defaultQuery) => {
  return useAPI<UniverType[]>("/maps", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const StatisticsInNumber = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/innumbers", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getFaqsAlldata = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/faqs", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const getAllUseFullLinks = (query = defaultQuery) => {
  return useAPI<DinamikObject[]>("/links", {
    query: query,
    watch: [query],
    server: true,
  });
};

export const gasConsumptionCalculatorService = {
  getAllDataAboutSeasons: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/calculators", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

export const getHerolidesData = {
  getAllHerolides: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/sliders", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getAllWithPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/sliders/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

interface IMessengerProps {
  id: number;
  telegram: string;
  instagram: string;
  facebook: string;
  youtube: string;
}
export const messengersService = {
  getAllMessengers: (query = defaultQuery) => {
    return useAPI<IMessengerProps[]>("/messengers", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};
