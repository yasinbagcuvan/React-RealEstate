import React, { useContext, useEffect } from 'react'
import Brand from '../assets/img/house.png'
import '../assets/style/navi.scss'  
import DataContext from '../context/DataContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdSearch } from 'react-icons/io';
import AuthContext from '../context/AuthContext';
const Navi = () => {

  const {state,logout,getCurrentUser} = useContext(AuthContext);
  const {dispatch} = useContext(DataContext);
  const{isAuthenticated,currentUser,ilanlar} = state
  const navigate = useNavigate();

  const handleLogin = () =>{
    navigate("/login")
  }
  const handleLogout = () =>{
    {logout()}
    navigate("/login");
  }

  const handleAdd = (e) =>{
    e.preventDefault();
      if(!isAuthenticated){
        toast.error('UnAuthenticated!', {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
        });
      }
  }

  useEffect(() =>{
    if(JSON.parse(localStorage.getItem("user"))){
      getCurrentUser()
    }
  },[])
  return (
    <nav>
    <div className="brand">
        <img src={Brand} alt="Marka" />
        <h3>REAL ESTATE</h3>
    </div>
    <ul className="liste">
            <li><NavLink to="/">Anasayfa</NavLink></li>
            <li><NavLink to={"ilanlar"}>Tüm ilanlar</NavLink></li>
            {currentUser && <li><NavLink to={"forms"}>İlan Ekle</NavLink></li>}
            {currentUser && <li><NavLink to={"ilanlarim"}>İlanlarım</NavLink></li>}
            
    </ul>
    <div className='search'>
            <input onChange={(e)=>dispatch({type:"search",payload:e.target.value})} type='text' placeholder='Search..'  /> 
            <NavLink to={"/ilanlar"} className='searchIcon'><IoMdSearch size={30} />  </NavLink> 
    </div>
    <div className="kullanici">
              {currentUser &&
                <div className="card-kullanici">
                  <img src={currentUser.avatar}/>
                    <div className="user-text">
                      <span>{currentUser.email} / {currentUser.role}</span>
                    </div>
                </div>
            }
            <button onClick={isAuthenticated?handleLogout:handleLogin}>{isAuthenticated?"Logout":"Login"}</button>
      </div>
</nav>
  )
}

export default Navi