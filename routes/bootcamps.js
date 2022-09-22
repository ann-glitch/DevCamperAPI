const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampByRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");
const { route } = require("./courses");

const Bootcamp = require("../models/Bootcamp");
const advancedResults = require("../middleware/advancedResults");

//include other resources
const courseRouter = require("./courses");

const router = express.Router();

const { protect } = require("../middleware/auth");

//re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, createBootcamp);

router.route("/:id/photos").patch(protect, bootcampPhotoUpload);

router
  .route("/:id")
  .get(getBootcamp)
  .patch(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

router.route("/radius/:zipcode/:distance").get(getBootcampByRadius);

module.exports = router;
