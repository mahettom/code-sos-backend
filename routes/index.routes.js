const Tutor = require("../models/TutorProfile.model");
const User = require("../models/User.model");

const router = require("express").Router();



router.get("/", (req, res, next) => {
  res.json("All good in here");
});

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
