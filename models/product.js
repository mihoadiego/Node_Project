
// here below are the inital Model automatically generated  via below command typed from terminal (confere main_notes.js explanations)
// sequelize model:create --name product --attributes title:string,price:double,image_url:string,description:string,is_active:boolean

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    //
    // *Helper method for defining associations.
    // *This method is not a part of Sequelize lifecycle.
    // *The `models/index` file will call this method automatically.
    //
    static associate(models) {
      // define association here
        product.belongsTo(models.user, { constraints: true, onDelete: 'CASCADE' });
    }
  }
  product.init({
    title: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    image_url: DataTypes.STRING,
    description: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'product', // by saving 'product', the associated table in postgres will automatically be pluralized to products
  });



  return product;
};




/* 

when managing sequelize manually, by defining models without going through migrations

const Sequelize = require('sequelize') // this returns a  class/ constructor function thus declaring it wiht a capital S
const sequelize = require('../utils/database') // importing connection pool managed by sequelize  

const Product = sequelize.define('product', { // by saying 'product', the associated table in postgres will automatically be pluralized to products
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  is_active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  },
  updated_at: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  }
});

module.exports = Product;
*/

