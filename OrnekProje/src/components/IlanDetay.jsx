import React, { useContext } from 'react'
import DataContext from '../context/DataContext'
import { useParams } from 'react-router-dom'

const IlanDetay = () => {
    const{state} = useContext(DataContext)
    const params = useParams();
    const param = params.ilanId
  return (
    <div>
        <div className="detay">
        <img src={state.ilanlar[param-1].ilanResmi} alt="" />
        <h3>{state.ilanlar[param-1].ilanBaslik}</h3>
        <p>{state.ilanlar[param-1].ilanAciklama}</p>
        <p>{state.ilanlar[param-1].ilanFiyat}</p>
        </div>
    </div>
  )
}

export default IlanDetay