const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const {
  createPostController,
  getAllPostsControler,
  getUserPostController,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

//router object
const router = express.Router();

//CREATE POST || POST
router.post("/create-post", requireSignIn, createPostController);

//GET ALL POSTs
router.get("/get-all-post", getAllPostsControler);

//GET USER POSTs
router.get("/get-user-post", requireSignIn, getUserPostController);

//DELETE POST
router.delete('/delete-post/:id', requireSignIn, deletePostController);

//DELETE POST
router.put('/update-post/:id', requireSignIn, updatePostController);


//export
module.exports = router;
