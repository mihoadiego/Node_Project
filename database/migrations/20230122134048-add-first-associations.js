'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'products', // name of Source model (even if we declare it 'product' in models/product.js, we have to provide the exact name of the table here, so 'products' (as sequelize automatically pluralize model's name for tabes's name in DB))
      'userId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        field:'user_id'
      }
    )
    // .then(()=>{
      // return queryInterface.addColumn(
        // ...
      // )
    // })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'products', // name of the model (even if we declare it 'product' in models/product.js, we have to provide the exact name of the table here, so 'products' (as sequelize automatically pluralize model's name for tabes's name in DB))
      'userId' // key we want to remove
    )
    // .then(() => {
      // return queryInterface.removeColumn(
      // ...
      // );
    // });;
  }
};
