import {createStore} from 'redux';
import Reducer from './index';

const store = createStore(Reducer);
export default store;