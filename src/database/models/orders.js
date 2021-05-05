'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orders.belongsTo(models.users, {
        foreignKey:'userId',
        onDelete:'CASCADE',
        onUpdate:'CASCADE',
      });
      }
  };
  orders.init({
    userId: DataTypes.INTEGER,
    product: {
      type: DataTypes.STRING,
      get: function() {
        return JSON.parse(this.getDataValue('product'));
      },
      set: function(value) {
        return this.setDataValue('product',JSON.stringify(value));
      }

    },
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};