import fetch from '@/utils/request.js'
function toLogin(data) {
  return fetch({
    url: '/login',
    method: 'post',
    data
  })
}
function getCode(data) {
  return fetch({
    url: '/sendsms',
    data: data,
    method: 'post'
  })
}
function register(data) {
  return fetch({
    url: '/register',
    method: 'post',
    data
  })
}
export { getCode, register, toLogin }