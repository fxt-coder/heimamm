import fetch from '@/utils/request.js'
function sortSubjectList(params) {
  return fetch({
    url: '/subject/list',
    params
  })
}
function setSubjectStatus(data) {
  return fetch({
    url: '/subject/status',
    method: 'post',
    data
  })
}
function addSubject(data) {
  return fetch({
    url: '/subject/add',
    method: 'post',
    data
  })
}
function editSubject(data) {
  return fetch({
    url: '/subject/edit',
    method: 'post',
    data
  })
}
function delSubject(data) {
  return fetch({
    url: '/subject/remove',
    method: 'post',
    data
  })
}
export { sortSubjectList, setSubjectStatus, addSubject, editSubject, delSubject }