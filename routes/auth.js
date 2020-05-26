const router = require("express").Router();
const User = require("../models/User")
const { registerValidation, loginValidation } = require("../validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


router.post('/register', async(req, res) => {
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).json(error.details[0].message)
        //check if user exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json("Email already exists")
    const salt = bcrypt.genSaltSync(10);
    const hashpwd = bcrypt.hashSync(req.body.password, salt)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashpwd
    })
    user.save()
        .then(() => res.json({ user: user.id }))
        .catch(err => res.status(400).json(`Error: ${err}`))
})

router.post('/login', async(req, res) => {
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).json(error.details[0].message)
        //check if user exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json("Email is not found")
        //if password is correct
    const validPass = bcrypt.compareSync(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid Password')
        //create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN)
    res.header('auth-token', token).send(token)
})









module.exports = router