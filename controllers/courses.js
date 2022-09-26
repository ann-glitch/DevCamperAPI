const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

// @description  Get all courses
// @route  GET /api/v1/courses
// @route  GET /api/v1/bootcamps/:bootcampId/courses
// @access  public
exports.getCourses = asyncHandler(async (req, res) => {
  if (req.query.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @description  Get Single Course
// @route  GET /api/v1/courses/:id
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
// @route  POST /api/v1/bootcamps/:bootcampId/courses
// @access  private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with the id ${req.params.bootcampId}`, 404)
    );
  }

  // make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to add a course in this bootcamp`,
        401
      )
    );
  }

  const courses = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: courses,
  });
});

// @description  Update course
// @route  UPDATE /api/v1/courses/:id
// @access  private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No bootcamp with the id ${req.params.id}`, 404)
    );
  }

  // make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id ${req.user.id} is not authorized to update this course`,
        401
      )
    );
  }

  //update course
  course = await Course.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @description  Delete course
// @route  DELETE /api/v1/courses/:id
// @access  private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No bootcamp with the id ${req.params.id}`, 404)
    );
  }

  // make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `User with id ${req.params.id} is not authorized to delete this course`,
        401
      )
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
