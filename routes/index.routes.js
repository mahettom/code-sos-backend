const Tutor = require("../models/TutorProfile.model");
const User = require("../models/User.model");
cosnt fileUpload from './connfig/cloudinary'

const router = require("express").Router();



router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/images", fileUpload.single('picture_url'), (req, res, next) => {
  res.json({ image: req.file.path })
})
// router.get("/test", async (req, res, next) => {
//   const tutor = await User.find()
//   res.json(tutor);
// })

// router.use('/auth', require('./auth.routes'))

// router.use("/", isAuthenticated);

// router.use('/posts', require('./posts.routes'))

// router.use('/profile', require('./profile.routes'))

// router.use('/available-tutors', require('./availableTutors.routes'))


module.exports = router;
