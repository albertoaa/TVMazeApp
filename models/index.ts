export interface Show {
  id: number;
  name: string;
  summary: string;
  image: {
    medium?: string;
    original?: string;
  };
  _embedded: {
    episodes?: Episode[];
  };
}

export interface Episode {
  id: number;
  name: string;
  summary: string;
  season: number;
  number: number;
  image: {
    medium?: string;
    original?: string;
  };
}
