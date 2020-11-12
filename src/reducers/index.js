import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import ruleReducer from './ruleReducer';
import ruleDetailsReducer from './ruleListReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    ruleCreation: ruleReducer,
    ruleDetails: ruleDetailsReducer,
});