import React, { useContext } from 'react'
import DataContext from '../context/DataContext'
import Ilan from './Ilan'

const Ilanlar = () => {
  const {state} = useContext(DataContext)
  return (
    <div className='ilan-list'>{
      state.ilanlar.map(ilan =>
        (ilan.ilanKategorisi === state.secilenKategori || state.secilenKategori === "Tüm Ilanlar") && (!ilan.isDeleted && 
          <Ilan ilan={ilan} key={ilan.id}/>)
      )
      }
    </div>
  )
}

export default Ilanlar