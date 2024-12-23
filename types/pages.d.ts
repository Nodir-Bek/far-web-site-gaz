interface IStandingCommission {
  title: string;
  views: number;
  date: string;
  id: number;
  data: {
    index: number;
    name: string;
    party: string;
    district_position: string;
    rank: string;
  }[];
}
