//Models
const { Meal } = require("../models/meal.model");

//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const MealExist = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const meal = await Meal.findOne({ where: { id, status: "active" } })

    if (!meal) {
        return next(new AppError("Meal does not exist", 404))
    }
    req.meal = meal
    next()
})

module.exports = { MealExist }