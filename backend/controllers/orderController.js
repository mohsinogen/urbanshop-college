import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import { sendEmail } from '../utils/sendEmail.js';
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save();

    const user = req.user; // User who placed the order
    const orderDetails = orderItems.map(item => {
      return `
        <p>Product: ${item.name} - Qty: ${item.qty} - Price: ₹${item.price}</p>
      `;
    }).join('');

    const emailHtml = `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #ffffff;
      color: #000000;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
    }
    h2 {
      color: #000000;
      text-align: center;
      font-size: 24px;
      margin-bottom: 20px;
    }
    h3 {
      color: #000000;
      font-size: 18px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    p {
      font-size: 16px;
      line-height: 1.5;
      color: #333333;
    }
    .order-details, .address, .payment-method, .total-price {
      background-color: #f4f4f4;
      padding: 10px;
      margin-top: 10px;
      border-radius: 4px;
    }
    .total-price {
      font-weight: bold;
      font-size: 18px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 14px;
      color: #666666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Order Confirmation</h2>
    <p>Hello ${user.name},</p>
    <p>Your order has been successfully created. Below are the order details:</p>
    
    <div class="order-details">
      ${orderDetails}
    </div>

    <h3>Shipping Address</h3>
    <p class="address">${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.postalCode}, ${shippingAddress.country}</p>

    <h3>Payment Method</h3>
    <p class="payment-method">${paymentMethod}</p>

    <h3>Total Price: ₹${totalPrice}</h3>
    <div class="total-price">₹${totalPrice}</div>

    <p>Thank you for shopping with us!</p>

    <div class="footer">
      <p>Best regards, <br> The Team</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email to the user
    try {
      await sendEmail(user.email, 'Your Order Confirmation', emailHtml);
      console.log('Order confirmation email sent to:', user.email);
    } catch (error) {
      console.error('Error sending email:', error);
    }

    res.status(201).json(createdOrder)
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
}
