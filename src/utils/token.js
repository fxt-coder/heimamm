
function saveToken(value) {
  window.localStorage.setItem('token', value)
}
function getToken() {
  return window.localStorage.getItem('token')
}
function removeToken() {
  window.localStorage.removeItem('token')
}
export {
  saveToken, getToken, removeToken
}