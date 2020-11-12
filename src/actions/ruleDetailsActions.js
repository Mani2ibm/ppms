import axios from 'axios'
import { GET_ERRORS , SAVE_DETAILS} from './types'


export const getRuleDetails = (user) => dispatch => { 
    const url = "http://localhost:3001/rule?user="+user;
    axios.get(url).then(res =>{
        if(res.data.length>0){
            dispatch({
                type : SAVE_DETAILS,
                ruleDetails : res.data
            })
        }else{
            dispatch({
                type : GET_ERRORS,
                payload : "No rules avaiable for the user"
            })  
        }
        
    }).catch((err =>{
        dispatch({
            type : GET_ERRORS,
            payload : "Error occrured while fetching rule details"
        })
    }))
}


