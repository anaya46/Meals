const express = require("express")

//controller
const { createMeal,
    getAllMeals,
    getOneMeal,
    updateMeal,
    deleteMeal } = require("../controllers/meals.controller")

//middlewares
const { protectSession, protectAdmin } = require("../middlewares/auth.middlewares")
const { MealExist } = require("../middlewares/meals.middlewares");
const { createMealsValidators } = require("../middlewares/validators.middlewares");

const mealsRouter = express.Router();

mealsRouter.get("/", getAllMeals)
mealsRouter.get("/:id", getOneMeal)

mealsRouter.use(protectSession)
mealsRouter.post("/:id", createMealsValidators, createMeal)
mealsRouter.patch("/:id", protectAdmin, MealExist, updateMeal)
mealsRouter.delete("/:id", protectAdmin, MealExist, deleteMeal)

module.exports = { mealsRouter }