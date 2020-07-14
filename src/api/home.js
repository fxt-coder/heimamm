import fetch from '@/utils/request.js'
import { getToken } from '@/utils/token.js'

function getUserInfo() {
  return fetch({
    url: '/info',
    header:{token:getToken()}
  })
}
function exitHome() {
  return fetch({
    url:'/logout',
  })
}
export { getUserInfo,exitHome }