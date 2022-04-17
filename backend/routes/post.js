const express = require("express");
const { createPost, likeAndUnlikePost,flagedandUnflaged, deletePost, getPostOffriends, updateCaption, commentOnPost, deleteComment, createPostOnlyCaption } = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated,createPost);
// router.route("/post/uploadCaption").post(isAuthenticated,createPostOnlyCaption);

router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  
  .put(isAuthenticated,updateCaption)
  .delete(isAuthenticated,deletePost);

router.route("/post/flag/:id").get(isAuthenticated,flagedandUnflaged)


router.route("/posts").get(isAuthenticated,getPostOffriends);

router.route("/posts/comments/:id").put(isAuthenticated,commentOnPost).delete(isAuthenticated,deleteComment);
module.exports= router;