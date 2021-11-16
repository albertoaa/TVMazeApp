export interface Show {
  id: number;
  name: string;
  summary: string;
  image: {
    medium?: string;
    original?: string;
  };
  embedded: {
    episodes?: Episode[];
  };
}

export interface Episode {
  id: number;
  name: string;
  summary: string;
  image: {
    medium?: string;
    original?: string;
  };
}
