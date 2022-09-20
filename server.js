const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

//load env vars
dotenv.config({ path: "./config/config.env" });

//mongodb connection
connectDB();

//route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");

const app = express();

//body parser
app.use(express.json());

//cookie-parser
app.use(cookieParser());

//dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//file upload
app.use(fileUpload());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

//error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold
  );
});

// handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`MongoServerError: ${err.message}`.red);

  //close server and exit process
  server.close(() => {
    process.exit(1);
  });
});
