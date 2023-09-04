export interface Point {
  type: string;
  longitude: number;
  latitude: number;
}
export interface SimpleMarkerSymbol {
  type: string;
  color: number[];
  outline: {
    color: number[];
    width: number;
  };
}
export interface Map {
  basemap: string;
}
export interface MapView {
  map: Function;
  container: HTMLDivElement | null;
  zoom: 5;
  center: number[];
}
