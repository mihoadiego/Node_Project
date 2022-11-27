'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('products', [
        {
          title:"Cow medy",
          image_url:"https://www.publicdomainpictures.net/pictures/240000/velka/cow-1513926637hE2.jpg",
          description:"ticket for next cow medy show- price per person",
          price:50.50
        },
        {
          title:"Scientist Kit",
          image_url:"https://www.publicdomainpictures.net/pictures/150000/velka/colorful-test-tubes-14548653516ym.jpg",
          description:"Complete Kit for 9+ y.old",
          price:100
        },
        {
          title:"Do not Be ShEye",
          image_url:"https://www.publicdomainpictures.net/pictures/20000/velka/blue-eye-detail.jpg",
          description:"wonderful painting",
          price:200,
        },
        {
          title:"Red hat",
          image_url:"https://www.publicdomainpictures.net/pictures/450000/velka/woman-in-red-hat.jpg",
          description:"Amazing redhat programing system",
          price:300,
        }
      ], {});

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('products', null, {});
  }
};
