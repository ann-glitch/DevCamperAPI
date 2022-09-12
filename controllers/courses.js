const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

// @description  Get all courses
// @route  /api/v1/courses
// @route  /api/v1/bootcamps/:bootcampId/courses
// @access  public
exports.getCourses = asyncHandler(async (req, res) => {
  let query;

  if (req.query.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @description  Get Single Course
// @route  /api/v1/courses/:id
// @access  public
exports.getCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    return new ErrorResponse(`Course with id ${req.params.id} not found`, 404);
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @description  Add course
// @route  /api/v1/bootcamps/:bootcampId/courses
// @access  private
exports.addCourse = asyncHandler(async (req, res) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return new ErrorResponse(`No bootcamp with the id ${req.params.id}`, 404);
  }
  const courses = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: courses,
  });
});
