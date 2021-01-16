const config = require('../../config/szwegoConfig')
const request = require('../request')
const { size, last, assign, concat, map } = require('lodash')
const moment = require('moment')

const getProductList = async (params, addSqlFun = null) => {
  const { token, shop_id, id, option, ...rest } = params
  const startDate = option.start_date ? moment(option.start_date).format('YYYY-MM-DD') : '2021-01-01'
  const endDate = option.end_date ? moment(option.end_date).format('YYYY-MM-DD') : '2021-01-10'
  let data = {
    albumId: shop_id,
    searchValue: '',
    startDate,
    endDate,
    sourceId: '',
    requestDataType: ''
  }
  let isLast = false
  let totalList = []
  while (!isLast) {
    const l = await fetchProductListByPage(data, token)
    if (size(l) > 0) {
      if (addSqlFun) {
        let i = 0
        while (i < size(l)) {
          const prod_info = assign(l[i], { sid: id })
          console.log(size(prod_info.imgs))
          if (size(prod_info.imgs) >= 9) {
            await addSqlFun(prod_info)
          }
          i += 1
        }
      }
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
