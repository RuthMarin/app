import {combineReducers} from 'redux';
import consultaReducer from './consultaReducer'

export default combineReducers({
  paciente: consultaReducer
})
