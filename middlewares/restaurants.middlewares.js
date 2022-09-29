//Models
const { Restaurant } = require("../models/restaurant.model");
const { Review } = require("../models/review.model");

//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");


const restaurantExist = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ where: { id, status: "active" } })

    if (!restaurant) {
        return next(new AppError("Restaurant does not exist", 404))
    }
    req.restaurant = restaurant


    next()
})
const reviewExist = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const review = await Review.findOne({
        where: { id }
    })

    if (!review) {
        return next(new AppError("Review does not exist", 404))
    }
    req.review = review
    next()
})
const validUserReview = catchAsync(async (req, res, next) => {
    const { sessionUser, review } = req;

    if (sessionUser.id !== review.userId) {

        return res.status(404).json({
            status: 'error',
            message: 'You are not the review owner',

        });

    }

    next()
});


module.exports = {
    restaurantExist,
    reviewExist,
    validUserReview,
}