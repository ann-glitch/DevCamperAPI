const Bootcamp = require("../models/Bootcamp");

// @description  Get all bootcamps
// @route  /api/v1/bootcamps
// @access  public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "failed to fetch bootcamps",
    });
  }
};

// @description  Get bootcamp
// @route  /api/v1/bootcamps/:id
// @access  public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({
        error: "Invalid Id",
      });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "failed to fetch bootcamp",
    });
  }
};

// @description  creates bootcamps
// @route  /api/v1/bootcamps
// @access  private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "failed to create bootcamp",
    });
  }
};

// @description  update bootcamp
// @route  /api/v1/bootcamps/:id
// @access  private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return res.status(400).json({
        error: "Bootcamp does not exist",
      });
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "failed to update bootcamp",
    });
  }
};

// @description  Delete bootcamp
// @route  /api/v1/bootcamps/:id
// @access  private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({
        error: "Bootcamp does not exist",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "failed to delete bootcamp",
    });
  }
};
