import axios from 'axios'
// function getCode(data) {
//   return axios({
//     url: process.env.VUE_APP_URL + "/sendsms",
//     method: "post",
//     data: data,
//     withCredentials: true
//   })
// }
// axios.interceptors.request.use(function (config) {
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// })
axios.interceptors.response.use(function (respones) {
  return respones;
},function (error) {
  return Promise.reject(error)
})
var fetch = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true
})
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
export { getCode, register }