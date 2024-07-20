import React, { useContext } from 'react'
import DataContext from '../context/DataContext'
import Ilan from './Ilan'
import Ilanlarim from './Ilanlarim'
import AuthContext from '../context/AuthContext'

const Ilanlar = () => {
  const {state} = useContext(DataContext,AuthContext)
  const {currentUser} = state
  return (
    <>
    <div className='ilan-list'>{
      state.ilanlar.map(ilan =>
        (ilan.ilanKategorisi === state.secilenKategori || state.secilenKategori === "Tüm Ilanlar") && (!ilan.isDeleted && 
          <Ilan ilan={ilan} key={ilan.id}/>)
      )
      }
    </div>
    {currentUser &&
    <div className='ilan-list'>{
      state.ilanlar.filter(item => item.ilanKisi === currentUser.id).map(ilan =>
        (ilan.ilanKategorisi === state.secilenKategori || state.secilenKategori === "Tüm Ilanlar") && !ilan.isDeleted &&  
          (<Ilanlarim ilan={ilan} key={ilan.id}/>)
      )
      }
    </div>}
    
    </>
  )
}

export default Ilanlar