'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'example@example.com',
      password: "123456",
      firstName: 'John',
      lastName: 'Doe',
      address: 'Ha Noi',
      phoneNumber: "0987879003",
      image: "nam",
      gender: 1,
      roleId: "ROLE",
      positionId: "developer",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
