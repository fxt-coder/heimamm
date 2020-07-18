import fetch from "@/utils/request.js"

function getUserlist(params) {
  return fetch({
    url: "/user/list",
    params
  })
}
function setStatus(data) {
  return fetch({
    url: '/user/status',
    method: "post",
    data
  })
}
function editUserlist(data) {
  return fetch({
    url: '/user/edit',
    method: 'post',
    data
  })
}
function delUserlist(data) {
  return fetch({
    url: '/user/remove',
    method: 'post',
    data
  })
}
function addUserlist(data) {
  return fetch({
    url: '/user/add',
    method: "post",
    data
  })
}
export { getUserlist, setStatus, editUserlist, delUserlist, addUserlist }