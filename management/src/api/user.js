import request from '@/utils/request'

export function add(data) {
  // { username, password }
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function remove(data) {
  // { id }
  return request({
    url: '/user/remove',
    method: 'post',
    data
  })
}

export function edit(data) {
  // { username, password }
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export function list() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
