const config = require('../../config/szwegoConfig')
const request = require('../request')
const { split, assign, map, concat, flatten, head } = require('lodash')
const QS = require('qs')

const login = async (data) => {
  const res = request.instance({
    url: `${config.host}/service/account/user_phone_operation.jsp?act=phone_login`,
    method: 'post',
    data: QS.stringify(data)
  }).then(res => {
    console.log(res.headers)
    return res.data
  })
  return new Promise((resolve, reject) => {
    resolve(res)
  })
}

module.exports = {
  login
}
