import { createContext, useContext, useEffect, useReducer, useState } from "react";
import AuthService from "../services/AuthService";
import { authInitialState, authReducer } from "../reducer/reducer1.js"
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const[authState,authDispatch] = useReducer(authReducer,authInitialState);
    const{isAuthenticated} = authState;


    const getCurrentUser = async()=> {
        const url = "https://api.escuelajs.co/api/v1/auth/profile";
        const response = await axios.get(url,{
          headers:{
            "Authorization":`Bearer ${JSON.parse(localStorage.getItem("user")).access_token}`
          }
        });
        const user = await response.data;
        console.log(user);
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
        

    const login1 = async(username,password) =>{
        try {
            const response = await AuthService.login(username,password);
            if(response.access_token){
                authDispatch({type:"setAuthenticated",payload:JSON.parse(localStorage.getItem("user"))})
            }
        } catch (error) {
            authDispatch({type:"setAuthenticated",payload:false})
            throw new Error(error)
        }
    }

    const logout = () =>{
        AuthService.logout();
        authDispatch({type:"setAuthenticated",payload:false})
        authDispatch({type:"logOut"})
    }

    // useEffect(() => {
    //     getCurrentUser();
    // }, []);

    return <AuthContext.Provider value={{logout,authState,authDispatch,getCurrentUser,login1}}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext