const { sequelize, insert, select, update, destory } = require('../../pool')
const syncHistory = require('../../model/szwego/syncHistory')
const syncOption = require('../../model/szwego/syncOption')
const syncShop = require('../../model/szwego/syncShop')
const { isEmpty } = require('lodash')

const SyncHistory = sequelize.define('szwego_sync_history', syncHistory)
const SyncOption = sequelize.define('szwego_sync_option', syncOption)
const SyncShop = sequelize.define('szwego_sync_shop', syncShop)

const addHistory = async (data) => {
  const { timestamp } = data
  const history = await insert(SyncHistory, { date: timestamp })
  return new Promise(resolve => {
    resolve(history)
  })
}

const addSyncShop = async (data) => {
  const { shid, sid } = data
  const syncShop = await insert(SyncShop, { shid, sid })
  return new Promise(resolve => {
    resolve(syncShop)
  })
}

const addOption = async (data) => {
  const { sid, start_date, end_date } = data
  const item = await select(SyncOption, {
    where: {
      sid
    }
  })
  let option = {}
  if (isEmpty(item)) {
    option = await insert(SyncOption, { sid, start_date, end_date })
  } else {
    option = item
  }
  return new Promise(resolve => {
    resolve(option)
  })
}

const getOption = async (data) => {
  const { sid } = data
  const option = await select(SyncOption, {
    where: {
      sid
    }
  })
  return new Promise(resolve => {
    resolve(option)
  })
}

module.exports = {
  SyncHistory,
  SyncOption,
  SyncShop,
  addOption,
  getOption,
  addHistory,
  addSyncShop
}
