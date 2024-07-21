export const authInitialState ={
    isAuthenticated:false,
    currentUser:{},
    user:"",
    password:"",

}

export const authReducer = (state, action) => {
    switch (action.type) {
        case"setAuthenticated":
            return{
                ...state,
                isAuthenticated:action.payload
            }
        case"currentUser":
            return{
                ...state,
                currentUser:action.payload
            }
        case"user":
            return{
                ...state,
                user:action.payload
            }
        case"password":
            return{
                ...state,
                password:action.payload
            }
        case"logOut":
            return{
                ...state,
                currentUser:"",
            }
    }
};

