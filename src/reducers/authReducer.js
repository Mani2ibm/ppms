import { SET_CURRENT_USER } from '../actions/types'

const initialState = {
    isAuthenticated : false,
    user: {}
}

export default function(state = initialState,action) {
    switch (action.type) {
        case SET_CURRENT_USER :
            return {
                ...state,
                isAuthenticated : Object.keys(action.payload).length === 0 && action.payload.constructor === Object ? false : true,
                user: action.payload
            }
        default:
            return state;
    }
}