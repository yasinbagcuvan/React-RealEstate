import { createContext, useReducer } from "react";
import AuthService from "../services/AuthService";
import { authInitialState, authReducer } from "../reducer/reducer1.js"
import axios from "axios";
import { toast, Zoom } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const[authState,authDispatch] = useReducer(authReducer,authInitialState);
    const{isAuthenticated} = authState;


    const getCurrentUser = async()=> {
        const token = JSON.parse(localStorage.getItem("user"))?.token;
        const url = "https://localhost:7083/api/Auth/profile";
        const response = await axios.get(url,{
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
        const user = await response.data;
        if(user){
            authDispatch({type:"setAuthenticated",payload:true})
            if (isAuthenticated) {
                authDispatch({ type: "currentUser", payload:user });
            }
            // else{
            //    logout();
            // }
          }
        }

        const getIlanUser = async (id) => {
            const url = `https://localhost:7083/api/Auth/getUser?userId=${id}`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const user = response.data;
                if (user) {
                    authDispatch({ type: "ilanKisiFullName", payload: user.fullName });
                    authDispatch({ type: "ilanKisiTel", payload: user.phoneNumber });
                    authDispatch({ type: "ilanKisiMail", payload: user.normalizedEmail });
                    authDispatch({ type: "ilanKisiFoto", payload: user.profilePictureUrl });
                }
            } catch (error) {
                console.error('Kullanıcı bilgileri getirilemedi:', error);
            }
        };
        

    const login1 = async(username,password) =>{
        try {
            const response = await AuthService.login(username,password);
            if(response.token){
                authDispatch({type:"setAuthenticated",payload:true})
            }
        } catch (error) {
            authDispatch({type:"setAuthenticated",payload:false})
            throw new Error(error)
        }
    }

    const register = async(yeni) =>{
        const url = "https://localhost:7083/api/Auth/register";
        const response = await axios.post(url,yeni, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        toast.success('Kayıt Başarılı! Hoşgeldiniz!', {
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
        return response.data;
    }

    const logout = () =>{
        AuthService.logout();
        authDispatch({type:"setAuthenticated",payload:false})
        authDispatch({type:"logOut"})
    }

    // useEffect(() => {
    //     getCurrentUser();
    // }, []);

    return <AuthContext.Provider value={{logout,authState,authDispatch,getCurrentUser,login1,register,getIlanUser}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext