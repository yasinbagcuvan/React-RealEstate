import React, { useContext } from 'react'
import DataContext from '../context/DataContext'
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Ilanlarim = ({ilan}) => {
    const{ilanSil,kartDuzenle,state,ilanlariGetir,currentUser} = useContext(DataContext,AuthContext);

  return (
    ((ilan.ilanBaslik.toLowerCase().startsWith(state.search.toLowerCase())) ||
    (ilan.ilanAciklama.toLowerCase().startsWith(state.search.toLowerCase()))) &&
    <div className='ilan'>
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
}

export default Ilanlarim