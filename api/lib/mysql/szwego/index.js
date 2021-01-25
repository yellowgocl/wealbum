const user = require('./user')
const shop = require('./shop')
const product = require('./product')
const sync = require('./sync')
const category = require('./category')

shop.Shop.belongsTo(category.Category, { foreignKey: 'category_id' })
shop.UserShop.belongsTo(shop.Shop, { foreignKey: 'sid' })
shop.UserShop.belongsTo(user.User, { foreignKey: 'uid' })
product.Product.belongsTo(shop.Shop, { foreignKey: 'sid' })
product.Product.belongsTo(product.ProductStatus, { foreignKey: 'status' })
product.ProductImg.belongsTo(product.Product, { foreignKey: 'pid' })
sync.SyncOption.belongsTo(shop.Shop, { foreignKey: 'sid' })
sync.ShopHistory.belongsTo(shop.Shop, { foreignKey: 'sid' })
sync.ShopHistory.belongsTo(sync.SyncHistory, { foreignKey: 'shid' })


const initTables = async () => {
  await user.User.sync()
  await category.Category.sync()
  await shop.Shop.sync()
  await shop.UserShop.sync()
  await product.Product.sync()
  await product.ProductImg.sync()
  await product.ProductStatus.sync()
  await sync.SyncHistory.sync()
  await sync.SyncOption.sync()
  await sync.ShopHistory.sync()
}

initTables()

module.exports = {
  user,
  shop,
  product,
  category,
  sync
}
