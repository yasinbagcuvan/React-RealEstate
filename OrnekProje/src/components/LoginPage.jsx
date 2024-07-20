import React, { useContext } from 'react'
import '../assets/style/login.scss'
import { Link, useNavigate } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const{state,dispatch,login1} = useContext(AuthContext);
  const{user,password} = state
  const navigate = useNavigate();

  const handleLogin = async(e) =>{
    e.preventDefault();
    try {
        // await login(user,password)
        {await login1(user,password)}
        toast.success('Login Successed!', {
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
        navigate("/")
    } catch (error) {
      toast.error('Login Failed!', {
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
        dispatch({type:"user",payload:""});
        dispatch({type:"password",payload:""});
    }
}

  return (
    <div className='login-page'>
        <div className="head">
            <h3>Welcome To</h3>
            <h3>Healty Recipe</h3>
            <h3>Platform</h3>
        </div>
        <form onSubmit={handleLogin}>
            <h3>Sign-In</h3>
            <input value={user} onChange={e =>dispatch({type:"user",payload:e.target.value})} type="text" placeholder='Username' />
            {console.log(user)}
            <input value={password} onChange={e=>dispatch({type:"password",payload:e.target.value})} type="password" placeholder='Password' />
            <input type="submit" value={"OK"} />
            <Link to="/">Guest Entrance</Link>
        </form>
    </div>
  )
}

export default LoginPage