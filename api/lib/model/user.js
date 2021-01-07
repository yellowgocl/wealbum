const { DataTypes } = require('sequelize')
module.exports = {
  user: {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
  role: {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING
  },
  permission: {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING
  },
  userRole: {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  rolePermission: {
    rid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }
}
