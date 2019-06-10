const initialState={
  noti: {}
}

export default (state = initialState, action) => {
  switch(action.type){
    case 'setNotification':
      return {
        ...state,
        noti: action.payload.noti
      }
    default:
      return state;
  }
}
