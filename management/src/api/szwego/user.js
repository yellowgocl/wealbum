import request from '@/utils/request'

const add = (data) => {
  // { username, password }
  return request({
    url: '/szwego/user/add',
    method: 'post',
    data
  })
}

const remove = (data) => {
  // { id }
  return request({
    url: '/szwego/user/remove',
    method: 'post',
    data
  })
}

const edit = (data) => {
  // { username, password }
  return request({
    url: '/szwego/user/edit',
    method: 'post',
    data
  })
}

const info = (id) => {
  return request({
    url: '/szwego/user/info',
    method: 'get',
    params: { id }
  })
}

const list = () => {
  return request({
    url: '/szwego/user/list',
    method: 'get'
  })
}

export default {
  add,
  remove,
  edit,
  info,
  list
}
