import axios from 'axios'
import { Message } from 'element-ui';
import { getToken, removeToken } from '@/utils/token.js'
import router from '@/router/router.js'
// import router from "@/router/router.js"
// function getCode(data) {
//   return axios({
//     url: process.env.VUE_APP_URL + "/sendsms",
//     method: "post",
//     data: data,
//     withCredentials: true
//   })
// }
let fetch = axios.create({
  baseURL: process.env.VUE_APP_URL,
  //axios请求自动跨域携带cookie
  withCredentials: true
})
fetch.interceptors.response.use(function (response) {
  if (response.data.code == 200) {
    return response.data;
  } else if (response.data.code == 206) {
    Message.error('请重新登录!')
    removeToken()
    router.push('/login')
    return Promise.reject("error")
  }
  else {
    // window.console.log(response.data.code);
    Message.error(response.data.message)
    return Promise.reject("error")
  }
}, function (error) {
  return Promise.reject(error)
})
// 添加请求拦截器
fetch.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 首先得有token我们才加，
  if (getToken()) {
    config.headers.token = getToken()
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

export default fetch;