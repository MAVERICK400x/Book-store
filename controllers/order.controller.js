import { orders } from "../models/order.model.js";
import { cart } from "../models/cart.model.js";

export const placeOrder = (req, res) => {
  if (cart.length === 0) {
    return res.redirect("/cart");
  }

  const { address, phone } = req.body; // Separate phone number input
  let subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  let gst = subtotal * 0.18;
  let shipping = 50;
  let grandTotal = subtotal + gst + shipping;

  const deliveryDays = Math.floor(Math.random() * 5) + 3;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);

  const deliveryPartners = ["BlueDart", "FedEx", "DTDC", "Delhivery", "Ecom Express"];
  const deliveryPartner = deliveryPartners[Math.floor(Math.random() * deliveryPartners.length)];

  const order = {
    id: Date.now(),
    items: [...cart],
    address,  // Address stored separately
    phone,     // Phone number stored separately
    subtotal: subtotal.toFixed(2),
    gst: gst.toFixed(2),
    shipping,
    grandTotal: grandTotal.toFixed(2),
    deliveryDate: deliveryDate.toDateString(),
    deliveryPartner,
  };

  orders.push(order);
  cart.length = 0; // Clear cart after checkout

  console.log(`Order placed: ${order.id}`);
  res.redirect("/orders");
};


export const getOrders = (req, res) => {
  res.render("orders", { title: "Your Orders", orders, user: req.session.user });
};
