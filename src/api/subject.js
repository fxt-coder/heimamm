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
export { sortSubjectList, setSubjectStatus }