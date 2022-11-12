const express = require("express");
const router = express.Router();
const User = require("../models").User;
const Course = require("../models").Course;

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
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      password: user.password,
    });
  })
);

// *POST route that creates a new user.
// Set the Location header to "/", and return a 201 HTTP status code and no content
router.post(
  "/users",
  asyncHandler(async (req, res) => {})
);

/* COURSE ROUTES */
// // *GET route that will return all courses including the User associated with each course
// // and a 200 HTTP status code
// router.get(
//   "/courses",
//   asyncHandler(async (req, res) => {})
// );

// // *GET route that will return the corresponding course including the User associated with that course
// // and a 200 HTTP status code
// router.get(
//   "/courses/:id",
//   asyncHandler(async (req, res) => {})
// );

// // *POST route that will create a new course, set Location header to the URI for newly created course,
// // and return a 201 HTTP status code and no content
// router.post(
//   "/courses",
//   asyncHandler(async (req, res) => {})
// );

// // *PUT route that will update the corresponding course
// // and return a 204 HTTP status code and no content
// router.put(
//   "/courses/:id",
//   asyncHandler(async (req, res) => {})
// );

// // *DELETE route that will delete the corresponding course
// //and return a 204 HTTP status code and no content
// router.delete(
//   "/courses/:id",
//   asyncHandler(async (req, res) => {})
// );

module.exports = router;
