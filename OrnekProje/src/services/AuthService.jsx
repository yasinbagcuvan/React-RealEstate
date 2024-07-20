import axios from "axios";

const AuthService = {
    login: async(username,password) => {
        const url ="https://api.escuelajs.co/api/v1/auth/login";
        const response = await axios.post(url,{
            email:username,password
        })
        if(response.data.access_token){
            localStorage.setItem("user",JSON.stringify(response.data))
            console.log(response.data);
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem("user");
    }
}

export default AuthService