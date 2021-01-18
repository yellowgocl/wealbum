const user = require('./user')
const shop = require('./shop')
const product = require('./product')
const sync = require('./sync')

shop.UserShop.belongsTo(shop.Shop, { foreignKey: 'sid' })
shop.UserShop.belongsTo(user.User, { foreignKey: 'uid' })
product.Product.belongsTo(shop.Shop, { foreignKey: 'sid' })
product.ProductImg.belongsTo(product.ProductImg, { foreignKey: 'pid' })
sync.SyncOption.belongsTo(shop.Shop, { foreignKey: 'sid' })
sync.ShopHistory.belongsTo(shop.Shop, { foreignKey: 'sid' })
sync.ShopHistory.belongsTo(sync.SyncHistory, { foreignKey: 'shid' })

const initTables = async () => {
  await user.User.sync()
  await shop.Shop.sync()
  await shop.UserShop.sync()
  await product.Product.sync()
  await product.ProductImg.sync()
  await sync.SyncHistory.sync()
  await sync.SyncOption.sync()
  await sync.ShopHistory.sync()
}

initTables()

module.exports = {
  user,
  shop,
  product,
  sync
}
