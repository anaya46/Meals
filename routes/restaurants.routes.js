const express = require('express');

//controller
const {
    createRestaurant,
    getAllRestaurants,
    getOneRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createReview,
    updateReview,
    deleteReview
} = require("../controllers/restaurants.controller")

//Middlewares
const { protectSession, protectAdmin, protectUsersAccount } = require("../middlewares/auth.middlewares")
const { restaurantExist, validUserReview, reviewExist } = require("../middlewares/restaurants.middlewares");
const { createRestaurantValidators } = require('../middlewares/validators.middlewares');

const restaurantsRouter = express.Router();

restaurantsRouter.get("/", getAllRestaurants)
restaurantsRouter.get("/:id", getOneRestaurant)

restaurantsRouter.use(protectSession);

restaurantsRouter.post('/', createRestaurantValidators, createRestaurant);
restaurantsRouter.patch("/:id", restaurantExist, protectAdmin, updateRestaurant)
restaurantsRouter.delete("/:id", restaurantExist, protectAdmin, deleteRestaurant)
restaurantsRouter.post("/reviews/:restaurantId", createReview)
restaurantsRouter.patch("/reviews/:id", reviewExist, validUserReview, updateReview)

restaurantsRouter.delete("/reviews/:id", reviewExist, validUserReview, deleteReview)

module.exports = { restaurantsRouter }