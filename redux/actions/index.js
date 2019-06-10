export const setPaciente = (nombre) => {
  return {
    type: 'setPaciente',
    payload: nombre
  }
}
export const setNotification = (notification) => {
  return {
    type: 'setNotification',
    payload: notification
  }
}
