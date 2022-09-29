//Models
const { Order } = require("../models/order.model");
//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");


const orderExist = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findOne({
        where: { id }
    })

    if (!order) {
        return next(new AppError("Order does not exist", 404))
    }
    req.order = order
    next()
})
const validUserOrder = catchAsync(async (req, res, next) => {
    const { sessionUser, order } = req;

    if (sessionUser.id !== order.userId) {

        return res.status(404).json({
            status: 'error',
            message: 'You are not the order owner',

        });

    }

    next()
});

module.exports = { orderExist, validUserOrder };