import { useAPI } from "~/composables/useApi";
import type {
  CardType,
  CategoryType,
  Chart,
  IStaticPageViews,
  DataField,
  Media,
  News,
  PaginateObject,
  RadioOptions,
  UniverType,
  User,
  Document,
  defaultType,
  defaultObject,
} from "~/types/home";

// get qilingan ma'lumot modeliga qarab kerakli typelarni yozamiz
export interface DinamikObject {
  [key: string]: any;
}

// select inputlar va istalgan holatda dinamik url orqali ma'lumot olish
export const getData = (slug: string, query = defaultQuery) => {
  return useAPI<DinamikObject[]>(`/${slug}`, {
    query: query,
    watch: [query],
    server: true,
  });
};

const defaultQuery = reactive({});

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

// barcha pagelarga bittadan service qo'shib chiqdim vaziyatga qarab shu yerga servicelarni qo'shib page va componentlarda ishlatishimiz mumkin, backdagi path aniq bo'lsa pathni o'zgartiramiz dinamikObjectni o'rniga kerakli typelarni qoyamiz

export const aboutCityService = {
  getAdministrativeTerritorialStructure: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/administrative-territorial-structure", {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getInternationalCooperation: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/cooperations/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getInternationalCooperationById: (id: string, query = defaultQuery) => {
    return useAPI<CardType>(`/cooperations/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getMarket: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/market", {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getMuseum: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/museum", {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getOtms: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/otms", {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getParks: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/parks", {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getTheaters: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/theaters", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

export const postersService = {
  getPosters: (query = defaultQuery) => {
    return useAPI<UniverType[]>("/posters", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getPostersPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>(`/posters/paginate`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getPostersById: (id: number, query = defaultQuery) => {
    return useAPI<UniverType>(`/posters/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

export const cityGovernmentService = {
  getDeputyGovernor: (query = defaultQuery) => {
    return useAPI<User[]>("/users", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getGovernmentPrograms: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/stateProgram", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getGovernmentProgramsPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/stateProgram/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getGovernorReglament: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/governor-reglament", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getGovernorSpeeches: (query = defaultQuery) => {
    return useAPI<CardType[]>("/speeches", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getGovernorSpeechesPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/speeches/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getGovernorSpeechesByID: (id: string, query = defaultQuery) => {
    return useAPI<CardType>(`/speeches/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getRegionPrograms: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/provinceProgram", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getRegionProgramsPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/provinceProgram/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getStructuralSections: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/structural-sections", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getWorkSchedule: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/work-schedule", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getGovernor: (query = defaultQuery) => {
    return useAPI<User[]>("/users", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getRegulation: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/regulation", {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getFormerGovernors: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/users/former", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

export const documentsService = {
  getCategory: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/documentCategory", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getChartData: (query = defaultQuery) => {
    return useAPI<Chart>("/opendatas/file", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOpen: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/opendata", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOpenPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/opendatas/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getOpenCategory: (query = defaultQuery) => {
    return useAPI<RadioOptions[]>("/opendatas/category", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOpenField: (query = defaultQuery) => {
    return useAPI<RadioOptions[]>("/opendatas/field", {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getRegulatory: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/regulatoryDocument", {
      query: query,
      watch: [query],
      server: true,
    });
  },
 

  getRegulatoryById: (id: string, query = defaultQuery) => {
    return useAPI<Document>(`/regulatoryDocument/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getRegulatoryCategory: (query = defaultQuery) => {
    return useAPI<CategoryType[]>("/regulatoryDocument/category", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

export const galleryService = {
  getCategory: (query = defaultQuery) => {
    return useAPI<Media[]>("/gallery-category", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getImages: (query = defaultQuery) => {
    return useAPI<Media[]>("/photoMedias", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getImagesPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/photoMedias/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getVideos: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/videoMedias", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getVideosPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/videoMedias/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

export const informationsService = {
  getActivitiesDeputies: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/deputiesActivities", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getActivitiesDeputiesPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/deputiesActivities/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getActivitiesDeputiesById: (id: string, query = defaultQuery) => {
    return useAPI<UniverType>(`/deputiesActivities/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getAddress: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/address", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getAntiCorruptionDepartment: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/anti-corruption-department", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getAppeals: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/appeals", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getConfidentialInfo: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/confidential-info", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getDailyRoutin: (query = defaultQuery) => {
    return useAPI<UniverType[]>("/sessions", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getDailyRoutinPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/sessions/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getDailyRoutinById: (id: string, query = defaultQuery) => {
    return useAPI<UniverType>(`/sessions/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },

  getReports: (query = defaultQuery) => {
    return useAPI<UniverType[]>("/reports", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getReportsPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/reports/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getReportsById: (id: string, query = defaultQuery) => {
    return useAPI<UniverType>(`/reports/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getFormalRelations: (query = defaultQuery) => {
    return useAPI<CardType[]>("/formalRelations", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getFormalRelationsPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/formalRelations/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getFormalRelationsById: (id: string, query = defaultQuery) => {
    return useAPI<CardType>(`/formalRelations/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getHotlineRegulation: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/hotline-regulation", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getInformationService: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/information-service", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getMandatoryInformation: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/mandatory-information", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getMembersOffSenate: (query = defaultQuery) => {
    return useAPI<UniverType[]>("/senateMembers", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getDeputies: (query = defaultQuery) => {
    return useAPI<UniverType[]>("/MPmembers", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getMustPrintInfo: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/must-print-info", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOpenCompetitionsTenders: (query = defaultQuery) => {
    return useAPI<UniverType[]>("/openChoices", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOpenCompetitionsTendersPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/openChoices/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOpenCompetitionsTendersById: (id: string, query = defaultQuery) => {
    return useAPI<UniverType>(`/openChoices/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOtherInfo: (query = defaultQuery) => {
    return useAPI<UniverType[]>("/otherInformations", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOtherInfoPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/otherInformations/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOtherInfoById: (id: string, query = defaultQuery) => {
    return useAPI<UniverType>(`/otherInformations/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getPersonalJuridicAppeals: (query = defaultQuery) => {
    return useAPI<UniverType[]>("/appeals", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getPersonalJuridicAppealsPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/appeals/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getPersonalJuridicAppealsById: (id: string, query = defaultQuery) => {
    return useAPI<CardType>(`/appeals/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getPhoneNumbers: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/phone-numbers", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getRoadmap: (query = defaultQuery) => {
    return useAPI<UniverType[]>("/roadMap", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getRoadmapPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/roadMap/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getRulesExistOpenMeeting: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/rules-exist-open-meeting", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getSinglePhoneRegulation: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/single-phone-regulation", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getSiteMap: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/site-map", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

export const NewsService = {
  getNews: (query = defaultQuery) => {
    return useAPI<UniverType[]>("/newsCategory", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getNewsPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/news/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getNewsById: (id: string, query = defaultQuery) => {
    return useAPI<News>(`/news/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

export const staticPageViewsService = {
  getAllViews: (query = defaultQuery) => {
    return useAPI<IStaticPageViews[]>("/pageViews", {
      query: query,
      // watch: [query],
      server: true,
    });
  },
  getOnePageViews: (query = defaultQuery) => {
    return useAPI<IStaticPageViews>("/pageViews/one", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

export const AboutUsService = {
  getAllData: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/abouts", {
      query: query,
      watch: [query],
      server: true,
    })
  },
  getAllPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/abouts/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOneById: (id: string, query = defaultQuery) => {
    return useAPI<News>(`/abouts/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

export const managementService = {
  getAllManagers: (query = defaultQuery) => {
    return useAPI<User[]>("/leaders", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

interface ItradeUniondataProps extends defaultObject {
  photo: string | null;
  desc: string | null;
}
export const tradeUnionSevice = {
  getAllTradeUnions: (query = defaultQuery) => {
    return useAPI<ItradeUniondataProps[]>("/tradeunions", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};
interface IPersonnelpolicies extends defaultObject {
  file: string | null;
}
export const personnelPoliciesService = {
  getAllTradeUnions: (query = defaultQuery) => {
    return useAPI<IPersonnelpolicies[]>("/personnelpolicies", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getAllWithPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/personnelpolicies/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

interface IVacancy extends defaultObject {
  desc: string | null;
}

export const vacanciesService = {
  getAllVacancies: (query = defaultQuery) => {
    return useAPI<IVacancy[]>("/vacancies", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

interface IDocuments extends defaultObject {
  file: string | null;
}
export const regionalDocumentsService = {
  getAll: (query = defaultQuery) => {
    return useAPI<IDocuments[]>("/documents", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getAllWithPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/documents/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

export const naturalgasconsumersService = {
  getAll: (query = defaultQuery) => {
    return useAPI<DinamikObject[]>("/naturalgasconsumers", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};

interface ILiquefiedgasconsumers extends defaultObject {
  desc: string | null;
  procedures: {
    title: string;
    desc: string;
  }[];
  photo: string | null;
}
export const liquefiedgasconsumersService = {
  getAll: (query = defaultQuery) => {
    return useAPI<ILiquefiedgasconsumers[]>("/liquefiedgasconsumers", {
      query: query,
      watch: [query],
      server: true,
    });
  },
};


export const openDatasService= {
  getDatasPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/opendatas/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOneById: (id: string, query = defaultQuery) => {
    return useAPI<News>(`/opendatas/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
}

export const antiCorruptonService={
  getAllDataWithPaginate: (query = defaultQuery) => {
    return useAPI<PaginateObject>("/fightcorruptions/paginate", {
      query: query,
      watch: [query],
      server: true,
    });
  },
  getOneById: (id: string, query = defaultQuery) => {
    return useAPI<News>(`/fightcorruptions/${id}`, {
      query: query,
      watch: [query],
      server: true,
    });
  },
}