import axios from 'axios'
import { REMOVE_DETAILS, SET_RULE_DETAIL, SET_TRIGGER_DETAIL, GET_ERRORS } from './types'


export const saveRuleDetails = (form) => dispatch => {    
    dispatch({
        type : SET_RULE_DETAIL,
        payload : form
    })
}

export const saveTriggerDetails = (form) => dispatch => {    
    dispatch({
        type : SET_TRIGGER_DETAIL,
        payload : form
    })
}

export const saveActionDetails = (form) => dispatch => { 
    const url = "http://localhost:3001/rule" 
    axios.post(url, form).then(res =>{
        dispatch({
            type : REMOVE_DETAILS,
            payload : form
        })
    }).catch((err =>{
        dispatch({
            type : GET_ERRORS,
            payload : "Not able to save rules"
        })
    }))
}


