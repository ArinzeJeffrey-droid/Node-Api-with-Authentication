const router = require("express").Router();
const verify = require("../validateUser")


router.get("/", verify, (req, res) => {
    res.json({ posts: { title: "My first post", description: "private data, classifield", user: req.user.name } })
        // res.send(req.user)
})











module.exports = router