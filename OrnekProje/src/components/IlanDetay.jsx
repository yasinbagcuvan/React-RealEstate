import React, { useContext , useEffect} from 'react'
import DataContext from '../context/DataContext'
import { useParams } from 'react-router-dom'

const IlanDetay = () => {
    const{state,ilanlariGetir} = useContext(DataContext)
    const params = useParams();
    const param = params.ilanId
    const {ilanlar} = state

    return (
      <div>
        {console.log(ilanlar)}
        <div className="detay">
        <img src={ilanlar[param].ilanResmi} alt="" />
        <h3>{ilanlar[param].ilanBaslik}</h3>
        <p>{ilanlar[param].ilanAciklama}</p>
        <p>{ilanlar[param].ilanFiyat}</p>
        </div>
    </div>
  )
}

export default IlanDetay