import axios from "axios";

const AuthService = {
    login: async(username,password) => {
        const url ="https://localhost:7083/api/Auth/login";
        const response = await axios.post(url,{
            username:username,password
        })
        console.log(response.data);
        if(response.data.token){
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