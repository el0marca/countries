import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./Country.module.css";
import { Country } from "./types";
import { MapContainer } from "./Map/Map";

export const CountryInfo: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const [countryInfo, setCountryInfo] = useState<Country | null>(null);

  useEffect(() => {
    if (countryName) {
      const getCountryInfo = async () => {
        const response = await axios.get<Country[]>(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );
        setCountryInfo(response.data[0]);
      };
      getCountryInfo();
    }
  }, [countryName]);

  return (
    <div className={s.wrapper}>
      {countryInfo && (
        <div>
          <p className={s.headerName}>{countryInfo.name.common}</p>
          <div>
            <MapContainer
              longitude={countryInfo.capitalInfo.latlng[1]}
              latitude={countryInfo.capitalInfo.latlng[0]}
            />
          </div>
          <div className={s.descr}>
            <p>Country code: {countryInfo.cca2}</p>
            <p>Full name: {countryInfo.name.official}</p>
            <p>Region: {countryInfo.region}</p>
            <p>Subregion: {countryInfo.subregion}</p>
            <p>Population: {countryInfo.population}</p>
            <p>
              Languages:
              {Object.values(countryInfo.languages).map((e) => (
                <span key={e}>{e}; </span>
              ))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
