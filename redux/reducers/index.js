import {combineReducers} from 'redux';
import consultaReducer from './consultaReducer'
import notification from './notifications'

export default combineReducers({
  paciente: consultaReducer,
  notification: notification
})
