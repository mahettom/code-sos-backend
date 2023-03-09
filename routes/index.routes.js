const router = require("express").Router();



router.get("/", (req, res, next) => {
  res.json("All good in here");
});


// router.use('/auth', require('./auth.routes'))

// router.use("/", isAuthenticated);

// router.use('/posts', require('./posts.routes'))

// router.use('/profile', require('./profile.routes'))

// router.use('/available-tutors', require('./availableTutors.routes'))


module.exports = router;
