import axios from 'axios';
import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';
import s from './Countries.module.css'
import { Countries } from './types';

export const CountriesList: FC = () => {
  const [countries, setCountries] = useState<Countries[]>([])
  const [value, setValue] = useState<string>('')

  const getCountries = async () => {
    const response = await axios.get<Countries[]>('https://restcountries.com/v2/all')
    setCountries(response.data)
  }
  React.useEffect(() => { getCountries() }, [])

  const filteredCountries = countries.filter(country => (
    country.name.toLowerCase().includes(value.toLowerCase()))
  )

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className={s.wrapper}>
      <form action="#">
        <input
          type="text"
          value={value}
          placeholder='find country'
          onChange={changeHandler}
        />
      </form>
      {countries.length > 0 && filteredCountries.map((e) => (
        <div className={s.card} key={e.name}>
          <img src={e.flags.png} alt={`flag of ${e.name}`} />
          <p className={s.headerName}>{e.name}</p>
          <p>{e.subregion}</p>
          <Link to={e.name}>More info</Link>
        </div>
      ))}
    </div>
  )
}