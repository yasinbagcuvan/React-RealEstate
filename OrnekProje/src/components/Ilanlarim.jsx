import React, { useContext, useEffect } from 'react'
import DataContext from '../context/DataContext'
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import varsayilanResim from '../assets/img/house.png'
import '../assets/style/ilanlar.scss'

const Ilanlarim = ({}) => {
    const{ilanSil,kartDuzenle,state,ilanlariGetir} = useContext(DataContext);
    const{authState,getCurrentUser} = useContext(AuthContext);
    const {currentUser,isAuthenticated} = authState
    const{ilanKisi,ilanlar} = state
    
    const filteredIlanlar = state.ilanlar.filter(item => item.ilanKisi === authState.currentUser.id && !item.isDeleted )

    useEffect(() =>{
      if(JSON.parse(localStorage.getItem("user"))){
        getCurrentUser()
       console.log(filteredIlanlar);
      }
    },[])

    
  // const baslikEslesiyorMu = ilan.ilanBaslik.toLowerCase().startsWith(state.search.toLowerCase());
  // const aciklamaEslesiyorMu = ilan.ilanAciklama.toLowerCase().startsWith(state.search.toLowerCase());

  // if ( !(baslikEslesiyorMu || aciklamaEslesiyorMu)) {
  //   return null;
  // }
  return (
    filteredIlanlar.map(ilan  =>
      ((ilan.ilanBaslik.toLowerCase().startsWith(state.search.toLowerCase())) ||
    (ilan.ilanAciklama.toLowerCase().startsWith(state.search.toLowerCase()))) &&
        <div className='ilan' key={ilan.id}>
          <p className='ilan-kategori'>{ilan.ilanKategorisi}</p>
          <p className='ilan-daireTipi'>{ilan.ilanDaireTipi}</p>
          <img src={ilan.ilanResmi?ilan.ilanResmi:varsayilanResim} alt={ilan.ilanBaslik+"_kapak"} /> 
          <div className="ilan-body">
              <h4>{ilan.ilanBaslik.substring(0,ilan.ilanBaslik.substring(0,100).lastIndexOf(" "))+"..."}</h4>
              <p> {ilan.ilanAciklama.substring(0,ilan.ilanAciklama.substring(0,100).lastIndexOf(" "))+"..."}</p>
              <p className='ilan-fiyat'>{ilan.ilanFiyat}$</p>
            </div>
            <div className='buttons'>
            {currentUser &&
          <a  onClick={()=>ilanSil(ilan.id)} className='bn30'><MdDeleteForever size={20} /></a>}
          <Link  className='bn30' to={`/ilan/${ilan.id}`} onClick={()=> ilanlariGetir()}>DETAY</Link>
          {currentUser &&
          <Link className='bn30' to={`/forms/${ilan.id}`} onClick={()=> kartDuzenle(ilan.id)}><MdEdit size={20} /></Link>}
          </div>
        </div>
    )
  )
}

export default Ilanlarim