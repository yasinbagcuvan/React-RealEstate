import React, { useContext } from 'react'
import DataContext from '../context/DataContext'
import Ilan from './Ilan'
import Ilanlarim from './Ilanlarim'
import AuthContext from '../context/AuthContext'

const Ilanlar = () => {
  const {state} = useContext(DataContext)
  const {authState} = useContext(AuthContext)

  return (
    <>
    <div className='ilan-list'>{
      state.ilanlar.map(ilan =>
        (ilan.ilanKategorisi === state.secilenKategori || state.secilenKategori === "Tüm Ilanlar") && (!ilan.isDeleted && 
          <Ilan ilan={ilan} key={ilan.id}/>)
      )}
    </div> 
    </>
  )
}

export default Ilanlar