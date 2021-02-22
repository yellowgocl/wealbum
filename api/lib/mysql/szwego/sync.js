const { sequelize, insert, select, update, destory } = require('../../pool')
const syncHistory = require('../../model/szwego/syncHistory')
const syncOption = require('../../model/szwego/syncOption')
const shopHistory = require('../../model/szwego/shopHistory')
const { isEmpty, isArray, size, concat } = require('lodash')
const modelConfig = require('../../../config/modelConfig')

const SyncHistory = sequelize.define('s_sync_history', syncHistory, modelConfig)
const SyncOption = sequelize.define('s_sync_option', syncOption, modelConfig)
const ShopHistory = sequelize.define('s_sync_shop_history', shopHistory, modelConfig)

const addHistory = async (data) => {
  const history = await insert(SyncHistory, data)
  return new Promise(resolve => {
    resolve(history)
  })
}

const updateHistory = async (data) => {
  const { id, ...rest } = data
  const history = await update(SyncHistory, rest, { where: { id } })
  return new Promise(resolve => {
    resolve(history)
  })
}

const getHistory = async (data) => {
  const { id } = data
  const history = await select(SyncHistory, { where: id })
  return new Promise(resolve => {
    resolve(history)
  })
}

const getHistorys = async () => {
  const history = await select(SyncHistory, {}, true)
  return new Promise(resolve => {
    resolve(history)
  })
}

const addOption = async (data) => {
  const { shop_id, start } = data
  const item = await select(SyncOption, {
    where: {
      shop_id
    }
  })
  let option = {}
  if (isEmpty(item)) {
    option = await insert(SyncOption, { shop_id, start })
  } else {
    option = item
  }
  return new Promise(resolve => {
    resolve(option)
  })
}

const getOption = async (data) => {
  const { shop_id } = data
  const option = await select(SyncOption, {
    where: {
      shop_id
    }
  })
  return new Promise(resolve => {
    resolve(option)
  })
}

const addShopHistory = async (data) => {
  const { sync_history_id, shop_id } = data
  const shopHistory = await insert(ShopHistory, { sync_history_id, shop_id })
  return new Promise(resolve => {
    resolve(shopHistory)
  })
}

const getShopHistorys = async (data) => {
  const { shop_id } = data
  let shopHistorys = await select(ShopHistory, {
    where: {
      shop_id
    }
  }, true)
  if (!isArray(shopHistorys)) {
    shopHistorys = [shopHistorys]
  }
  return new Promise(resolve => {
    resolve(shopHistorys)
  })
}

module.exports = {
  SyncHistory,
  SyncOption,
  ShopHistory,
  addOption,
  getOption,
  addHistory,
  getHistorys,
  getHistory,
  updateHistory,
  addShopHistory,
  getShopHistorys
}
