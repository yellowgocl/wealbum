const config = require('../../config/szwegoConfig')
const request = require('../request')
const { map, concat, filter, assign } = require('lodash')

const getAlbumList = async (params) => {
  const { token, timestamp } = params
  const { totalPage, currentPage, list } = await fetchAlbumListByPage({ token })
  let totalList = list
  let current = currentPage + 1
  let total = totalPage
  while (current <= total) {
    const res = await fetchAlbumListByPage({ token, timestamp, page_index: current })
    totalList = concat(totalList, res.list)
    current = res.currentPage + 1
  }
  return new Promise((resolve, reject) => {
    resolve(totalList)
  })
}

const fetchAlbumListByPage = async (query) => {
  const { token, timestamp, ...rest } = query
  const params = {
    'act': 'attention',
    '_': timestamp,
    'search_value': '',
    'tag_id': ''
  }
  const data = request
    .instance({
      url: `${config.host}/service/album/get_album_list.jsp`,
      method: 'get',
      headers: {
        Cookie: `token=${token}`
      },
      params: assign(rest, params)
    })
    .then((res) => {
      if (res.data.errcode === 0) {
        const list = filter(res.data.result.shop_list, o => {
          return !o['is_my_album']
        })
        const currentPage = res.data.cur_page
        const totalPage = res.data.total_page
        return {
          list,
          currentPage,
          totalPage
        }
      } else {
        return res.data
      }
    })
  return new Promise(resolve => {
    resolve(data)
  })
}

module.exports = {
  getAlbumList
}
