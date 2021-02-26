const { SyncHistory, SyncOption, ShopHistory } = require('../../model/szwego')
const { isEmpty, isArray, size, concat, map, isNull } = require('lodash')


const addHistory = async (data) => {
  const history = await SyncHistory.create(data)
  return new Promise(resolve => {
    resolve(history)
  })
}

const updateHistory = async (data) => {
  const { id, ...rest } = data
  const history = await SyncHistory.update(rest, { where: { id } })
  return new Promise(resolve => {
    resolve(history)
  })
}

const getHistory = async (data) => {
  const { id } = data
  const history = await SyncHistory.findOne({ where: id })
  return new Promise(resolve => {
    resolve(history)
  })
}

const getHistorys = async () => {
  const history = await SyncHistory.findAll()
  return new Promise(resolve => {
    resolve(history)
  })
}

const addOption = async (data) => {
  const { shop_id, start } = data
  const shop = await getOption(data)
  let option = {}
  if (isNull(shop)) {
    option = await SyncOption.create(data)
  } else {
    option = await SyncOption.update({
      start
    }, {
        where: {
          shop_id
      }
    })
  }
  return new Promise(resolve => {
    resolve(option)
  })
}

const getOption = async (data) => {
  const { shop_id } = data
  const option = await SyncOption.findOne({
    where: {
      shop_id
    }
  })
  return new Promise(resolve => {
    resolve(option)
  })
}

const addShopHistory = async (data) => {
  // const { sync_history_id, shop_id } = data
  const shopHistory = await ShopHistory.create(data)
  return new Promise(resolve => {
    resolve(shopHistory)
  })
}

const getShopHistorys = async (data) => {
  const { shop_id } = data
  let shopHistorys = await ShopHistory.findAll({
    where: {
      shop_id
    }
  })
  return new Promise(resolve => {
    resolve(shopHistorys)
  })
}

module.exports = {
  addOption,
  getOption,
  addHistory,
  getHistorys,
  getHistory,
  updateHistory,
  addShopHistory,
  getShopHistorys
}
