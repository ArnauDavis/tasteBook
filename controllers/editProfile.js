const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User")

module.exports = {
    editProfile: async (req, res) => {
        try {
          res.render("editProfile.ejs", {page: req.url, user:req.user, bio:req.user.bio, profilePic: req.user.profilePic });
        } catch (err) {
          console.log(err);
        }
      },
      updateProfile: async (req, res) => {
        try {
            let user = await User.findById(req.user.id);

            // Handle Profile Picture Update (if a new file was uploaded) ---
            if (req.file) {
                // Delete old image from Cloudinary if an old one exists (cloudinaryId is stored)
                if (user.cloudinaryId) {
                    await cloudinary.uploader.destroy(user.cloudinaryId);
                    console.log(`Deleted old Cloudinary asset: ${user.cloudinaryId}`);
                }

                // Upload new image to Cloudinary
                const result = await cloudinary.uploader.upload(req.file.path);

                // Update the user object with the new Cloudinary data
                user.profilePic = result.secure_url; // The URL for display
                user.cloudinaryId = result.public_id;   // The ID for future deletion
                console.log("New profile picture uploaded and saved.");
            }
            // If no file is uploaded, the existing profilePicture and cloudinaryId remain unchanged.

            // Handle Bio Update (if submitted in the form) 
            if (req.body.bio !== undefined) {
                user.bio = req.body.bio;
            }

            // Save the updated user document to MongoDB
            await user.save();

            res.redirect('/profile');
        } catch (err) {
            console.error(err);
            res.redirect('/profile');
            // res.redirect('/profile?error=true');
        }
    }
}