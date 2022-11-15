const express = require("express");
const router = express.Router();
const User = require("../models").User;
const Course = require("../models").Course;
const { authenticateUser } = require("../middleware/auth-user");

// async Handler -  middleware to wrap each of our routes automatically in a try-catch block
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

/* USER ROUTES */
// *GET route that returns all properties and values for the currently authenticated User
// along with a 200 HTTP status code
router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.status(200).json(user);
  })
);

// *POST route that creates a new user.
// Set the Location header to "/", and return a 201 HTTP status code and no content
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.location("/");
      res.status(201).end();
    } catch (error) {
      console.log("ERORR: ", error.name);

      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

/* COURSE ROUTES */
// // *GET route that will return all courses including the User associated with each course
// // and a 200 HTTP status code
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    let courses = await Course.findAll({
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
    res.status(200).json(courses);
  })
);

// // *GET route that will return the corresponding course including the User associated with that course
// // and a 200 HTTP status code
router.get(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
    res.status(200).json(course);
  })
);

// // *POST route that will create a new course, set Location header to the URI for newly created course,
// // and return a 201 HTTP status code and no content
router.post(
  "/courses",
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      const course = await Course.create(req.body);
      res.location("/courses/" + `${course.id}`);
      res.status(201).end();
    } catch (error) {
      console.log("ERORR: ", error.name);

      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// // *PUT route that will update the corresponding course
// // and return a 204 HTTP status code and no content
router.put(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      if (course) {
        course.title = req.body.title;
        course.description = req.body.description;
        course.estimatedTime = req.body.estimatedTime;
        course.materialsNeeded = req.body.materialsNeeded;
        res.status(404).end();
      }
    } catch (error) {
      console.log("ERORR: ", error.name);

      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// // *DELETE route that will delete the corresponding course
// //and return a 204 HTTP status code and no content
// router.delete(
//   "/courses/:id",
//   authenticateUser,
//   asyncHandler(async (req, res, next) => {
//     const course = await Course.findByPk(req.params.id);
//     if (course) {
//       return res.status(204).end();
//     } else {
//       throw error;
//     }
//   })
// );

module.exports = router;
