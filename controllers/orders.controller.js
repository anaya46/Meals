//Model
const { Meal } = require("../models/meal.model");
const { Order } = require("../models/order.model");
const { Restaurant } = require("../models/restaurant.model");


//utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


const createOrder = catchAsync(async (req, res, next) => {
    const { sessionUser } = req
    const { quantity, mealId } = req.body;

    const meal = await Meal.findOne({ where: { id: mealId } })

    if (!meal) {
        return res.status(400).json({
            status: "error",
            message: "meal does not exist",
        });
    }

    const newOrder = await Order.create({
        quantity,
        mealId,
        totalPrice: quantity * meal.price,
        userId: sessionUser.id,

    });

    res.status(200).json({
        status: 'success',
        data: { newOrder },

    });
});

const getAllOrders = catchAsync(async (req, res, next) => {
    const { sessionUser } = req
    const orders = await Order.findAll({
        where: {
            userId: sessionUser.id,
            status: "active"
        },
        include: [{ model: Meal, include: { model: Restaurant } },
        ]
    })

    res.status(200).json({
        status: "success",
        date: { orders }
    })

});

const updateOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const order = await Order.findOne({ where: { id, status: "active" } });
    if (!order) {
        return res.status(400).json({
            status: "error",
            message: "order no found",
        });
    }
    await order.update({ status: "completed" });
    res.status(200).json({
        status: "success",
        data: {
            order,
        },
    });
})
const deleteOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const order = await Order.findOne({ where: { id, status: "active" } });
    if (!order) {
        return res.status(400).json({
            status: "error",
            message: "order no found",
        });
    }
    await order.update({ status: "cancelled" });
    res.status(200).json({
        status: "success",
        data: {
            order,
        },
    });
})



module.exports = {
    createOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
}