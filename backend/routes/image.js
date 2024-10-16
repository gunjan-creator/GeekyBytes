const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../middleware/multer");

router.post("/", upload.single("image"), async function (req, res) {
  // console.log(req.file);
  // console.log(req.file);
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }
  // console.log(req.file.path);
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result,
    });
  } catch (error) {
     console.error("Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading to Cloudinary",
    });
  }
});

module.exports = router;
