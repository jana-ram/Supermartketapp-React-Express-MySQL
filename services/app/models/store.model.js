module.exports = (sequelize, Sequelize) => {
    const Store = sequelize.define("stores", {
        storeCode: {
            type: Sequelize.STRING
        },
        storeName: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN
        },
        isDelected: {
            type: Sequelize.BOOLEAN
        }
    });  
    return Store;
  };
  