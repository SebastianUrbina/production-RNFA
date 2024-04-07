const postModel = require("../models/postModel");

// create post
const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    //validate
    if (!title || !description) {
      res.status(500).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    const post = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();
    res.status(201).send({
      success: true,
      message: "Post Created Successfully",
      post,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error Creating Post API",
      error,
    });
  }
};

// GET ALL POSTS
const getAllPostsControler = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Posts Data",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GETALLPOSTS API",
      error,
    });
  }
};

const getUserPostController = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in User POST API",
      error,
    });
  }
};

//delete post

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your Post has been deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete post api",
      error,
    });
  }
};

//UPDATE POST
const updatePostController = async (req, res) => {
  try {
    const {title, description} = req.body
    //post find
    const post = await postModel.findById({ _id: req.params.id });
    //validation
    if(!title || !description){
      return res.status(500).send({
        succes: false,
        message: "Please Provide Post Title or Description"
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id:req.params.id},
      {
        title: title || post?.title,
        description: description || post?.description,      
      },
      { new: true }
    );
    res.status(200).send({
      success:true,
      message: "Post Updated Succesfully",
      updatedPost,
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      succes:false,
      message: "Error in update post api",
      error,
    })
  }
};

module.exports = {
  createPostController,
  getAllPostsControler,
  getUserPostController,
  deletePostController,
  updatePostController,
};
