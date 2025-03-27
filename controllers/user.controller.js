import { users } from "../models/user.model.js";

// Render Login Page
export const renderLoginPage = (req, res) => {
  res.render("login", { title: "Login" });
};

// Render Register Page
export const renderRegisterPage = (req, res) => {
  res.render("register", { title: "Register" });
};

// Register User
export const registerUser = (req, res) => {
  const { username, password } = req.body;
  if (users.some(u => u.username === username)) {
    return res.send("User already exists!");
  }
  users.push({ username, password });
  res.redirect("/users/login");
};

// Login User
export const loginUser = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.send("Invalid credentials!");
  }
  req.session.user = user;
  res.redirect("/");
};

// Logout User
export const logoutUser = (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};
