import React, { useContext } from 'react'
import Brand from '../assets/img/house.png'
import '../assets/style/navi.scss'  
import DataContext from '../context/DataContext';
import { NavLink } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
const Navi = () => {

  const {state,dispatch} = useContext(DataContext);
  return (
    <nav>
    <div className="brand">
        <img src={Brand} alt="Marka" />
        <h3>REAL ESTATE</h3>
    </div>
    <ul className="liste">
            <li><NavLink to="/">Anasayfa</NavLink></li>
            <li><NavLink to={"ilanlar"}>Tüm ilanlar</NavLink></li>
            <li><NavLink to={"Forms"}>İlan Ekle</NavLink></li>
    </ul>
    <div className='search'>
            <input onChange={(e)=>dispatch({type:"search",payload:e.target.value})} type='text' placeholder='Search..'  /> 
            <NavLink to={"/ilanlar"} className='searchIcon'><IoMdSearch size={30} />  </NavLink> 
    </div>
</nav>
  )
}

export default Navi