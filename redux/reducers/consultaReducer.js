const initialState={
  paciente: ''
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'setPaciente':
      return {
        ...state,
        paciente: action.payload,

      }
    default:
      return state;
  }
}
