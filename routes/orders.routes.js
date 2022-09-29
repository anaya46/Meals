const express = require("express")

//controller
const { createOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
} = require("../controllers/orders.controller");

//middlewares
const { protectSession } = require("../middlewares/auth.middlewares");
const { orderExist, validUserOrder } = require("../middlewares/orders.middlewares");

const ordersRouter = express.Router();

ordersRouter.use(protectSession)
ordersRouter.post("/", createOrder)
ordersRouter.get("/me", getAllOrders)
ordersRouter.patch("/:id", orderExist, validUserOrder, updateOrder)
ordersRouter.delete("/:id", orderExist, validUserOrder, deleteOrder)


module.exports = { ordersRouter }