const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const editProfileController = require("../controllers/editProfile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.put("/updateProfile", ensureAuth, upload.single("file"), editProfileController.updateProfile);

module.exports = router;