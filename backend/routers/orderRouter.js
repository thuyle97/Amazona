import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is empty." });
    } else {
      const order = new Order({
        orderItems: res.body.orderItems,
        shippingAddress: res.body.shippingAddress,
        paymentMethod: res.body.paymentMethod,
        itemsPrice: res.body.itemsPrice,
        shippingPrice: res.body.shippingPrice,
        taxPrice: res.body.taxPrice,
        totalPrice: res.body.totalPrice,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      res
        .status(201)
        .send({ message: "New order created", order: createdOrder });
    }
  })
);
export default orderRouter;
