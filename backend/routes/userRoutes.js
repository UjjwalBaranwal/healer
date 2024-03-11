const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

//get me endpoint
// router.use(authController.protect) in this after this point every router have a protect middle ware without embedding in them so we can now remove authcontroler.protect from them
router.use(authController.protect);

router.get("/me", userController.getMe, userController.getUser);

// from this point only admin has a access so now here we can use router.use(authController.restrictTo('admin')) so that after this point only admin can access this route
router.use(authController.restrictTo("admin"));
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
