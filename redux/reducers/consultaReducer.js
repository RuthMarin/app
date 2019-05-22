const initialState={
  name: '',
  age: 0,
  birthDate: 0,
  validity: false,
  lastPapDate: 0,
  validityDate: 0,
  diffDays:0,
  diffMonths:0,
  diffYears:0
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'setPaciente':
      return {
        ...state,
        name: action.payload.name,
        age: action.payload.age,
        birthDate: action.payload.birthDate,
        validity: action.payload.validity,
        lastPapDate: action.payload.lastPapDate,
        validityDate: action.payload.validityDate,
        diffDays: action.payload.diffDays,
        diffMonths: action.payload.diffMonths,
        diffYears: action.payload.diffYears

      }
    default:
      return state;
  }
}
