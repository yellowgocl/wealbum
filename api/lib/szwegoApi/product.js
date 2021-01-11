const config = require('../../config/szwegoConfig')
const request = require('../request')
const { size, last, assign, concat } = require('lodash')

const getProductList = async (params) => {
  const { token, shop_id } = params
  let data = {
    albumId: shop_id,
    searchValue: '',
    startDate: '',
    endDate: '',
    sourceId: '',
    requestDataType: ''
  }
  let isLast = false
  let totalList = []
  while (!isLast) {
    const l = await fetchProductListByPage(data, token)
    if (size(l) > 0) {
      const timestamp = last(l)['time_stamp']
      assign(data, { timestamp })
      totalList = concat(totalList, l)
    } else {
      isLast = true
    }
  }
  return new Promise((resolve, reject) => {
    resolve(totalList)
  })
}

const fetchProductListByPage = async (params, token) => {
  const list = request
    .instance({
      url: `${config.host}/album/personal/image`,
      method: 'post',
      headers: {
        Cookie: `token=${token}`
      },
      params
    }).then(res => {
      if (res.data.errcode === 0) {
        return res.data.result.items
      } else {
        return []
      }
    })
  return new Promise(resolve => {
    resolve(list)
  })
}

module.exports = {
  getProductList
}
