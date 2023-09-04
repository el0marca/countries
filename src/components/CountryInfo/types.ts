export interface Country {
  name: {
    common: string;
    official: string;
  };
  capitalInfo: { latlng: [number, number] };
  cca2: string;
  region: string;
  subregion: string;
  area: string;
  population: string;
  languages: { [key: string]: string };
}
