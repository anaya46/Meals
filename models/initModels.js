// Models
const { User } = require('./user.model');
const { Review } = require('./review.model');
const { Order } = require('./order.model');
const { Restaurant } = require('./restaurant.model');
const { Meal } = require('./meal.model');


const initModels = () => {
    // 1 User : M Reviews
    User.hasMany(Review, { foreignKey: "userId" });
    Review.belongsTo(User);

    // 1 User : M Orders
    User.hasMany(Order, { foreignKey: "userId" });
    Order.belongsTo(User);

    // 1 Restaurant : M Reviews
    Restaurant.hasMany(Review, { foreignKey: "restaurantId" });
    Review.belongsTo(Restaurant);

    // 1 Restaurant : M Meals
    Restaurant.hasMany(Meal, { foreignKey: "restaurantId" });
    Meal.belongsTo(Restaurant);

    // 1 Order : 1 Meal
    Meal.hasOne(Order, { foreignKey: "mealId" });
    Order.belongsTo(Meal);


};

module.exports = { initModels };
