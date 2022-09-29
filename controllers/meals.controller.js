//Model
const { Meal } = require("../models/meal.model")

//utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
const { Restaurant } = require("../models/restaurant.model");

const createMeal = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const { sessionUser } = req;

    const newMeal = await Meal.create({ userId: sessionUser.id, name, price, restaurantId: id });

    res.status(201).json({
        status: 'success',
        data: { newMeal },

    });
});

const getAllMeals = catchAsync(async (req, res, next) => {
    const meals = await Meal.findAll({
        where: { status: "active" },
        include: { model: Restaurant }
    })

    res.status(200).json({
        status: "success",
        date: { meals }
    })

});

const getOneMeal = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const meal = await Meal.findOne({
        where: { id, status: "active" },
        include: { model: Restaurant }
    });

    res.status(200).json({
        status: 'success',
        data: { meal },
    });
});

const updateMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    const { name, price } = req.body

    await meal.update({ name, price })

    res.status(200).json({
        status: 'success',
        data: { meal },
    });
});

const deleteMeal = catchAsync(async (req, res, next) => {
    const { meal } = req;
    await meal.update({ status: 'deleted' });

    res.status(200).json({ status: 'success' });
});


module.exports = {
    createMeal,
    getAllMeals,
    getOneMeal,
    updateMeal,
    deleteMeal
}