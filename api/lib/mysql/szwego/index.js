const user = require('./user')
const shop = require('./shop')
const product = require('./product')
const status = require('./status')
const sync = require('./sync')
const category = require('./category')
const szwegoModel = require('../../model/szwego')
const { Category, Product, Img, Status, Shop, ShopHistory, SyncHistory, SyncOption, User, UserShop } = szwegoModel


const force = false

User.belongsToMany(Shop, {
  through: {
    model: UserShop,
    unique: false
  },
  foreignKey: 'user_id',
  constraints: false
})
Shop.belongsToMany(User, {
  through: {
    model: UserShop,
    unique: false
  },
  foreignKey: 'shop_id',
  constraints: false,
})

Category.hasMany(Shop, { foreignKey: 'category_id', as: 'shops' })
Shop.belongsTo(Category, {
  foreignKey: 'category_id',
  through: { model: 'CategoryShop', unique: false}
})

Shop.products = Shop.hasMany(Product, { foreignKey: 'shop_id', as: 'products' })
Product.belongsTo(Shop, {
  foreignKey: 'shop_id',
  through: { model: 'ShopProduct', unique: false}
})

Product.imgs = Product.hasMany(Img, { foreignKey: 'product_id', as: 'imgs' })
Img.belongsTo(Product, {
  foreignKey: 'product_id',
  through: { model: 'ProductImg', unique: false}
})

Shop.option = Shop.hasOne(SyncOption, { foreignKey: 'shop_id', as: 'option' })
SyncOption.belongsTo(Shop, {
  foreignKey: 'shop_id',
  through: { model: 'ShopOption', unique: false}
})


SyncHistory.belongsToMany(Shop, {
  through: {
    model: ShopHistory,
    unique: false
  },
  foreignKey: 'sync_history_id'
})
Shop.belongsToMany(SyncHistory, {
  through: {
    model: ShopHistory,
    unique: false
  },
  foreignKey: 'shop_id'
})


const initTables = async () => {
  await User.sync({ force }) // { force: true }
  await Category.sync({ force })
  await Shop.sync({ force })
  await UserShop.sync({ force })

  await Status.sync({ force })
  await Product.sync({ force })
  await Img.sync({ force })
  
  await SyncHistory.sync({ force })
  await SyncOption.sync({ force })
  await ShopHistory.sync({ force })
}

initTables()

module.exports = {
  user,
  shop,
  product,
  category,
  status,
  sync
}
