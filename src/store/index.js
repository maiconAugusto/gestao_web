import {combineReducers} from 'redux'
import LOGIN from './reducer/loginReducer';
import LIST from './reducer/listReducer';

export default combineReducers({
    LOGIN,
    LIST
})