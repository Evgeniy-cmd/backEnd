'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Tasks', 'userId', Sequelize.UUID, {
      after: "updatedAt"
    });
 
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Tasks', 'userId')
  }
};
