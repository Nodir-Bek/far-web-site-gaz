interface DocContent {
  id: number;
  name?: string;
  text: string;
}

interface Documents {
  title: string;
  content: DocContent[];
}
interface DateTimeFormatOptions {
  [key: string]: string;
}
export interface ErrorModel {
  status: string;
  message: string;
}

export interface RouterMeta {
  name: string;
  icon: string;
  show: string[];
}
export interface TabItems {
  key: string;
  label: string;
  badge: string;
}
export interface DateTimeFormatOptions {
  [key: string]: string;
}

export interface RadioOptions {
  id: number;
  title: string;
  count: number;
  date: string;
}

export interface GallaryData {
  id: number;
  title: string;
  description: string;
  date: string;
  url: string;
  type: string;
}

export interface defaultObject {
  id: number;
  title: string;
}
interface defaultType {
  id: number;
  province: defaultObject | string;
  moderator?: string | number;
  views?: number | null;
  active?: boolean;
}

export interface CardType extends defaultType {
  title: string;
  photos: string[];
  desc: string;
  date: string;
}
export interface CorruptionCategory extends defaultType {
  title: string;
  region?: defaultObject | null;
  date: string;
}
export interface Document extends defaultType {
  title: string;
  category?: defaultObject | null;
  field?: defaultObject | null;
  type?: defaultObject | null;
  desc: string;
  file: string;
  date: string;
  downloaded: number | null;
  onlyDownload?: boolean;
  downloads?: number | null;
  documentDate?: string | null;
  serialNumber?: string | null;
}

export interface News extends defaultType {
  title: string;
  newsCategory: defaultObject | null;
  type: defaultObject | null;
  desc: string;
  photos: string[];
  date: string;
  image?: string | null;
}

export interface UniverType extends defaultType {
  title: string;
  desc: string;
  date: string;
  photos: string[];
  file: string | null;
  region: number | string | null;
  documentDate: string | null;
}

interface CardData {
  label: string;
  value: string;
  class: string;
}
export interface User extends defaultType {
  fullName: string;
  region: number | string | null;
  birthData: string;
  nationality: string;
  information: string;
  constituency: string;
  positionData: string;
  websites: string[];
  date: string | null;
  photo: string;
  file: string | null;
  phone?: string | null;
  lastName?: string | null;
  email?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  cardData?: CardData[] | null;
}

export interface Media extends defaultType {
  title: string;
  region: string;
  media?: string;
  photo: string | null;
  date: string;
}

export interface PaginateObject {
  rows:
    | CardType[]
    | Document[]
    | UniverType[]
    | News[]
    | User[]
    | Media[]
    | IActionStrategy[]
    | IStaticPageViews[];
  limit: number;
  totalPages: number;
  count: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export interface YearNames {
  id: number;
  title: string | null;
  year: number | null;
  file: null;
}

export interface IRegions {
  id: number;
  province: defaultObject;
  title: string;
  desc: string;
  population: number;
  area: number;
  established: number;
  center: string;
  website: string;
  photo?: string | null;
  prefix?: number | null;
  address?: string | null;
}
export interface LaborActivities {
  years: string;
  desc: string;
  id: number;
}

export interface User extends defaultType {
  firstName: string;
  lastName: string;
  middleName: string;
  region: number | null;
  email: string;
  information: string;
  position: string;
  member: string;
  role: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  partyAffiliation: string;
  graduated: string;
  specialty: string;
  award: string;
  task: string;
  photo: string;
  startDate: string;
  endDate: string;
  laborActivities: LaborActivities[];
}

export interface IDynamicMenuSchema {
  region: defaultObject | null;
  id: number;
  title: string;
  province: defaultObject;
  moderator: string;
  parent: string;
  content: string;
  date: string;
  views: number;
  active: boolean;
  photos: string[];
}

export interface DataField {
  id: number;
  date: string;
  title: string;
  count: number;
}
export interface Data {
  id?: number;
  title: string;
  content: string;
  date: string;
  likes: number;
  shares: number;
  views: number;
  image: string;
}

export interface Chart {
  doc: number;
  xls: number;
  pdf: number;
  xml: number;
  csv: number;
  json: number;
  total: number;
}

interface Base {
  id: number;
  title: string;
}

export interface CategoryChild {
  documentCategory: Base;
  count: number;
}

export interface CategoryType {
  items: CategoryChild[] | null;
  parentDocument: Base | null;
}
export interface IActionStrategy {
  region: defaultObject | null;
  id: number;
  title: string;
  province: defaultObject;
  desc: string;
  date: string;
  views: number;
  documentDate: string | null;
  file?: string | null;
}

export interface IStaticPageViews {
  path: string;
  views: number;
  id: number;
}
