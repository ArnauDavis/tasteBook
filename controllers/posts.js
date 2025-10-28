const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/Post")
const User = require("../models/User")
const Comments = require("../models/Comments")
const helpers = require('../config/helpers')
module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id }).sort({ createdAt: "desc" });
      res.render("mainDash.ejs", {page: req.url, posts: posts, user:req.user, bio:req.user.bio, profilePic: req.user.profilePic });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("mainDash.ejs", {page: req.url, posts: posts, visitorId: req.user.id });
    } catch (err) {
      console.log(err);
    }
  },
  getFavorites: async (req, res) => {
    try {
      const posts = await Post.find({ favorites: req.user.id }).sort({ createdAt: "desc" });
      res.render("mainDash.ejs", {page: req.url, posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const postCreator = await User.findById(post.user);
      const comments = await Comments.find({post: req.params.id}).populate('user').sort({ createdAt: "desc" }).lean();
      const postProfile = postCreator.id 
      const userName = postCreator.userName
      const visitorId = req.user.id
      const visitorPic = req.user.profilePic
      res.render("post.ejs", {page: req.url, post: post, user: userName, comment: comments, postProfile: postProfile, visitorId:visitorId, visitorPic: visitorPic, timeSince: helpers.timeSince});
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
    favoritePost: async (req, res) => {
    try {
      let user = req.user.id
      let post = req.params.id
      await Post.findByIdAndUpdate(
        post,
        { '$push': { favorites: user } },
        { new: true }
      );
      res.redirect(`/post/${post}`);
    } catch (err) {
      console.log(err);
    }
  },
  unfavoritePost : async (req, res) => {
    try {
      let user = req.user.id
      let post = req.params.id
      await Post.findByIdAndUpdate(
        post,
        { '$pull': { favorites: user } },
        { new: true }
      );
      res.redirect(`/post/${post}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.deleteOne({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
      res.redirect("/profile");
    }
  },
};
