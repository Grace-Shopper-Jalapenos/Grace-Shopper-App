const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

// API Imports
const userAPI = require("./api/users");
const adminAPI = require("./api/admins");
const productsAPI = require("./api/products");
const ordersAPI = require("./api/orders");
const reviewsAPI = require("./api/reviews");
const categoriesAPI = require("./api/categories");
const authAPI = require("./api/auth");
const cartAPI = require("./api/cart");
const stripeAPI = require("./api/stripeCheckout");

// Database Imports
const {
  syncAndSeed,
  model: { Products, Artists, Categories, Users, Orders, Reviews },
} = require("./db");

// Serve Static Folder
app.use(express.static(path.join(__dirname, "../public")));

// Server Request Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware Logging
app.use(morgan("dev"));

// API Routes
app.use("/api/users", userAPI);
app.use("/api/admins", adminAPI);
app.use("/api/products", productsAPI);
app.use("/api/orders", ordersAPI);
app.use("/api/reviews", reviewsAPI);
app.use("/api/categories", categoriesAPI);
app.use("/api/auth", authAPI);
app.use("/api/cart", cartAPI);
app.use("/api/checkout", stripeAPI);

app.get("/", async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  } catch (err) {
    next(err);
  }
});

module.exports = app;
