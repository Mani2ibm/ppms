import axios from 'axios'
import { GET_ERRORS, SET_CURRENT_USER } from './types'

//  LOGIN
export const loginUser= (userData) => dispatch => {
    axios.get("http://localhost:3001/user?q=" + userData.username)
        .then(res => {
            console.log("response",res.data)
            if(res.data.length>0 && res.data[0].password === userData.password){
                console.log("response",res.data)
                const token = res.data[0]
                localStorage.setItem('jwtToken',JSON.stringify(token))
                dispatch(setCurrentUser(res.data[0]));
                dispatch({
                    type : GET_ERRORS,
                    payload : {}
                })
            }
            else{
                dispatch({
                    type : GET_ERRORS,
                    payload : "Password is wrong"
                }) 
            }
        })
        .catch(err => {
            dispatch({
                type : GET_ERRORS,
                payload : "User not present"
            })
        })
}

export const setCurrentUser = (user) => {
    return {
        type : SET_CURRENT_USER,
        payload : user
    }
}


//Logout
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(setCurrentUser({}))
}