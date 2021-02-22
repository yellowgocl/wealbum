const user = require('./user')
const shop = require('./shop')
const product = require('./product')
const productStatus = require('./productStatus')
const sync = require('./sync')
const category = require('./category')

//
// category.Category.hasMany(shop.Shop)
shop.Shop.belongsTo(category.Category, { foreignKey: 'category_id' }) // 
//
// shop.Shop.hasOne(shop.UserShop)
shop.UserShop.belongsTo(shop.Shop, { foreignKey: 'shop_id' }) // 
// 
// user.User.hasMany(shop.UserShop)
shop.UserShop.belongsTo(user.User, { foreignKey: 'user_id' }) // 
// 
// shop.Shop.hasMany(product.Product)
product.Product.belongsTo(shop.Shop, { foreignKey: 'shop_id' }) // 
// productStatus.ProductStatus.hasMany(product.Product)
product.Product.belongsTo(productStatus.ProductStatus, { foreignKey: 'status_id' }) // 
// 
// product.Product.hasMany(product.ProductImg, { foreignKey: 'product_id'})
product.ProductImg.belongsTo(product.Product, { foreignKey: 'product_id'}) // 
// 
// shop.Shop.hasOne(sync.SyncOption)
sync.SyncOption.belongsTo(shop.Shop, { foreignKey: 'shop_id' }) // 
// 
// shop.Shop.hasMany(sync.ShopHistory)
sync.ShopHistory.belongsTo(shop.Shop, { foreignKey: 'shop_id' }) // 
//
// sync.SyncHistory.hasMany(sync.ShopHistory)
sync.ShopHistory.belongsTo(sync.SyncHistory, { foreignKey: 'sync_history_id' }) // 


const initTables = async () => {
  await user.User.sync() // { force: true }
  await category.Category.sync()
  await shop.Shop.sync()
  await shop.UserShop.sync()

  await productStatus.ProductStatus.sync()
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
  category,
  productStatus,
  sync
}
