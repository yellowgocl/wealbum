const user = require('./user')
const shop = require('./shop')
const product = require('./product')
const productStatus = require('./productStatus')
const sync = require('./sync')
const category = require('./category')
const szwegoModel = require('../../model/szwego')
const { Category, Product, ProductImg, ProductStatus, Shop, ShopHistory, SyncHistory, SyncOption, User, UserShop } = szwegoModel

User.belongsToMany(Shop, { through: UserShop, foreignKey: 'user_id' })
Shop.belongsToMany(User, { through: UserShop, foreignKey: 'shop_id' })

Category.hasMany(Shop, { foreignKey: 'category_id' })
Shop.belongsTo(Category, { foreignKey: 'category_id' })

Shop.products = Shop.hasMany(Product, { foreignKey: { name: 'shop_id', allowNull: false }, as: 'products' })
Product.belongsTo(Shop, { foreignKey: 'shop_id' })

Product.imgs = Product.hasMany(ProductImg, { foreignKey: 'product_id', as: 'imgs' })
ProductImg.belongsTo(Product, { foreignKey: 'product_id' })

Shop.option = Shop.hasOne(SyncOption, { foreignKey: { name: 'shop_id', allowNull: false }, as: 'option' })
SyncOption.belongsTo(Shop, { foreignKey: 'shop_id' })

SyncHistory.belongsToMany(Shop, { through: ShopHistory, foreignKey: 'sync_history_id' })
Shop.belongsToMany(SyncHistory, { through: ShopHistory, foreignKey: 'Shop_id' })


const initTables = async () => {
  await User.sync({ force: true }) // { force: true }
  await Category.sync({ force: true })
  await Shop.sync({ force: true })
  await UserShop.sync({ force: true })

  await ProductStatus.sync({ force: true })
  await Product.sync({ force: true })
  await ProductImg.sync({ force: true })
  
  await SyncHistory.sync({ force: true })
  await SyncOption.sync({ force: true })
  await ShopHistory.sync({ force: true })
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
