const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser')

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect DB
connectDB();

// Load Route files
const companies = require("./routes/companies");
const tours = require("./routes/tours");
const auth = require("./routes/auth")
const user = require("./routes/users")

// Initialize app with express
const app = express();

// Cookie parser
app.use(cookieParser())

// file uploading
app.use(fileupload())

// Body Parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

// Mount routers
app.use("/api/v1/companies", companies);
app.use("/api/v1/tours", tours);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user)

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});
