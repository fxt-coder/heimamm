import fetch from "@/utils/request.js"

function getBusiness(params) {
  return fetch({
    url: "/enterprise/list",
    params
  })
}
function setStatus(data) {
  return fetch({
    url: '/enterprise/status',
    method: "post",
    data
  })
}
function editBusiness(data) {
  return fetch({
    url: '/enterprise/edit',
    method: 'post',
    data
  })
}
function delBusiness(data) {
  return fetch({
    url: '/enterprise/remove',
    method: 'post',
    data
  })
}
function addBusiness(data) {
  return fetch({
    url: '/enterprise/add',
    method: "post",
    data
  })
}
export { getBusiness, setStatus, editBusiness, delBusiness, addBusiness }