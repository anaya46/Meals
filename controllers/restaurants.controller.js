const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { Restaurant } = require('../models/restaurant.model');
const { Review } = require("../models/review.model")

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


dotenv.config({ path: './config.env' });

const createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body;
    const newRestaurant = await Restaurant.create({
        name,
        address,
        rating,

    });

    // Remove password from response
    //newUser.password = undefined;

    // 201 -> Success and a resource has been created
    res.status(201).json({
        status: 'success',
        data: { newRestaurant },
    });
});
const getAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = await Restaurant.findAll({
        where: { status: "active" },
        include: Review
    })

    res.status(200).json({
        status: "success",
        date: { restaurants }
    })

});
const getOneRestaurant = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({ where: { id } });

    res.status(200).json({
        status: 'success',
        data: { restaurant },
    });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { name, address } = req.body

    await restaurant.update({ name, address })

    res.status(200).json({
        status: 'success',
        data: { restaurant },
    });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    await restaurant.update({ status: 'deleted' });

    res.status(200).json({ status: 'success' });
});

const createReview = catchAsync(async (req, res, next) => {
    const { restaurantId } = req.params;
    const { comment, rating } = req.body
    const { sessionUser } = req;

    const newReview = await Review.create({ userId: sessionUser.id, restaurantId, comment, rating })
    res.status(201).json({
        status: "success",
        data: { newReview }
    })
});
const updateReview = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { comment, rating } = req.body;

    const review = await Review.findOne({ where: { id } });
    await review.update({ comment, rating });


    res.status(200).json({
        status: "success",
        data: { review }

    });
});
const deleteReview = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const review = await Review.findOne({ where: { id } });
    await review.update({ status: "deleted" });

    res.status(200).json({
        status: 'success',
    });


});


module.exports = {
    createRestaurant,
    getAllRestaurants,
    getOneRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview
}