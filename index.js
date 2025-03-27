import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import userRoutes from "./routes/user.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import path from "path";
import { products } from "./models/product.model.js"; // ✅ Import products array

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ secret: "secret-key", resave: false, saveUninitialized: true }));

// Logger Middleware
app.use(loggerMiddleware);

// Set View Engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

// ✅ FIX: Pass `products` when rendering home.ejs
app.get("/", (req, res) => {
  res.render("home", { title: "Online Bookstore", user: req.session.user, products });
});

// 404 Error Handling
app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

