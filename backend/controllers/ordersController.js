

const db = require('../models/index.js');

const getAllOrders = (req, res) => {
  res.json(db.orders);
};

// Creates the final order directly
const createOrder = (req, res) => {
    const { items, shippingAddress, totalAmount, addOns, deliveryMethod, deliveryDate, couponCode, discountAmount, shippingCost } = req.body;
    
    if (!items || !shippingAddress || !totalAmount) {
        return res.status(400).json({ message: "Missing required order details" });
    }
    
    // In a real app, all totals would be securely recalculated on the backend.
    // For this mock implementation, we'll use the data sent from the frontend.
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxAmount = items.reduce((sum, item) => {
      const itemDiscount = discountAmount > 0 && subtotal > 0 ? (item.price / subtotal) * discountAmount : 0;
      const taxableValue = item.price - itemDiscount;
      return sum + (taxableValue * (item.gstRate || 0) / 100);
    }, 0);


    const newOrder = {
        orderNumber: `LU-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString(),
        customerName: shippingAddress.fullName,
        shippingAddress: shippingAddress,
        items: items,
        subtotal: subtotal,
        shippingCost: shippingCost || 0,
        taxAmount: taxAmount,
        discountAmount: discountAmount,
        total: totalAmount,
        status: 'Processing',
        addOns,
        deliveryMethod,
        deliveryDate,
        couponCode
    };

    db.orders.unshift(newOrder); // Add to in-memory store
    
    res.status(201).json(newOrder);
};

module.exports = {
  getAllOrders,
  createOrder,
};