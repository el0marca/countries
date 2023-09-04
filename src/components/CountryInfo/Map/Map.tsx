import React, { useRef, useEffect, FC } from "react";
import { loadModules } from "esri-loader";
import s from "./Map.module.css";
import { Map, MapView, Point, SimpleMarkerSymbol } from "./types";

export const MapContainer: FC<{ longitude: number; latitude: number }> = ({
  longitude,
  latitude,
}) => {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let view: any;
    loadModules([
      "esri/views/MapView",
      "esri/Map",
      "esri/Graphic",
      "esri/layers/GraphicsLayer",
    ]).then(([MapView, Map, Graphic, GraphicsLayer]) => {
      const map = new Map({ basemap: "topo-vector" } as Map);
      view = new MapView({
        map: map,
        container: mapElement.current,
        zoom: 5,
        center: [longitude, latitude],
      } as MapView);

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      const simpleMarkerSymbol: SimpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      };
      const point: Point = {
        type: "point",
        longitude,
        latitude,
      };
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol,
      });
      graphicsLayer.add(pointGraphic);
    });

    return () => {
      if (view) {
        view.destroy();
        view = null;
      }
    };
  }, [longitude, latitude]);
  return <div className={s.wrapper} ref={mapElement} />;
};