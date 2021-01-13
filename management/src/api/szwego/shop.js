import request from '@/utils/request'

const list = (uid) => {
  return request({
    url: '/szwego/shop/list',
    method: 'get',
    params: { uid }
  })
}

export default {
  list
}
