const { Sequelize, DataTypes } = require('sequelize')
module.exports = {
  user: {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: DataTypes.STRING,
    mobile: DataTypes.STRING,
    email: DataTypes.STRING,
    loginTime: DataTypes.DATE,
    loginCount: DataTypes.INTEGER
  },
  role: {},
  permission: {},
  userRole: {},
  rolePermission: {}
}
