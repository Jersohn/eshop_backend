const { Order } = require("../models/order");
const express = require("express");

const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderlist = await Order.find();
  if (!orderlist) {
    res.status(500).json({ success: false });
  }
  res.send(orderlist);
});
router.post(`/`, (req, res) => {
  const order = new Order({
    quantity: req.body.quantity,
    price: req.body.price,
  });
  order
    .save()
    .then((createdorder) => {
      res.status(201).json(createdorder);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});
module.exports = router;