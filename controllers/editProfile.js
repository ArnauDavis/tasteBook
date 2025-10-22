const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User")

module.exports = {
    editProfile: async (req, res) => {
        try {
          console.log(req.user)
          res.render("editProfile.ejs", {page: req.url, user:req.user, bio:req.user.bio, profilePic: req.user.profilePic });
        } catch (err) {
          console.log(err);
        }
      },
    }