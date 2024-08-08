
export interface ILocation {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; 
  url: string;
  created: string;
}

export interface IEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[]; 
  url: string;
  created: string;
}

export interface ICharacter {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string; 
  episode: string[]; 
  url: string;
  created: string;
}


export type NameAPI = 'character' | 'episode' | 'location'
export type ArrayAPI = ICharacter[] | IEpisode[] | ILocation[]