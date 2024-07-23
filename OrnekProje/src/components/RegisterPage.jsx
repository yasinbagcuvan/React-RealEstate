import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { toast, Zoom } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/style/register.scss'
import PhoneInput from 'react-phone-input-2'


const RegisterPage = () => {
    const{authState,authDispatch,register} = useContext(AuthContext)
    const{user,password,email,fullName,phoneNumber,profilePictureUrl} = authState
    const navigate = useNavigate();
    
    console.log(profilePictureUrl);
    console.log(user);
    const handleRegister = async(e) =>{
        e.preventDefault();
        try {
            const data ={
                username:user,
                password:password,
                email:email,
                fullName:fullName,
                profilePictureUrl:profilePictureUrl,
                phoneNumber : phoneNumber
            }
            register(data)
            authDispatch({type:"resetRegisterForm"})
            navigate("/login")
        } catch (error) {
            toast.error('Register Failed!', {
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
            authDispatch({type:"resetRegisterForm"})
        }
    }

  return (
    <div className='register-page'>
    <div className="head">
        <h3>Welcome To</h3>
        <h3>Real Estate</h3>
        <h3>Platform</h3>
    </div>
    <form className='register-form' onSubmit={handleRegister}>
        <h3>Sign-Up</h3>
        <input value={fullName} onChange={e =>authDispatch({type:"fullName",payload:e.target.value})} type="text" placeholder='Full Name' maxLength={32}/>

        <input value={user} onChange={e =>authDispatch({type:"user",payload:e.target.value})} type="text" placeholder='Username' maxLength={32}/>

        <input value={email} onChange={e =>authDispatch({type:"email",payload:e.target.value})} type="email" placeholder='E-mail' maxLength={50}/>

        <input value={password} onChange={e=>authDispatch({type:"password",payload:e.target.value})} type="password" placeholder='Password' />

        <input value={profilePictureUrl} onChange={e =>authDispatch({type:"profilePictureUrl",payload:e.target.value})} type="url" placeholder='Profil fotoğrafı Url' maxLength={1000}/>
        <PhoneInput specialLabel='' inputClass='number' country={"tr"} value={phoneNumber} onChange={e=>authDispatch({type:"phoneNumber",payload:e})}/>


        <input type="submit" value={"Register"} />
        <Link type='button' to={'/login'}>Login</Link>
        <Link to={'/'}>Home</Link>
    </form>
</div>
  )
}

export default RegisterPage