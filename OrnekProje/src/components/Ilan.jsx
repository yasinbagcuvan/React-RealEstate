import React, { useContext } from 'react'
import DataContext from '../context/DataContext'
import varsayilanResim from '../assets/img/house.png'
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Ilan = ({ilan}) => {
  const{ilanSil,kartDuzenle,state} = useContext(DataContext);

  return (
    ((ilan.ilanBaslik.toLowerCase().startsWith(state.search.toLowerCase())) ||
    (ilan.ilanAciklama.toLowerCase().startsWith(state.search.toLowerCase()))) &&
    <div className='ilan'>
      <img src={ilan.ilanResmi?ilan.ilanResmi:varsayilanResim} alt={ilan.ilanBaslik+"_kapak"} /> 
      <div className="card-body">
          <h4>{ilan.ilanBaslik}</h4>
          <p> {ilan.ilanAciklama}</p>
        </div>
        <div className='buttons'>
      <a  onClick={()=>ilanSil(ilan.id)} className='bn30'><MdDeleteForever size={20} /></a>
      <Link  className='bn30' to={ilan.id}>DETAY</Link>
      <Link className='bn30' onClick={()=> kartDuzenle(ilan.id)}><MdEdit size={20} /></Link>
      </div>
    </div>
  )
}

export default Ilan