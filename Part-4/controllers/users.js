const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(req, res) => {
    const users = await User.find({})
    return res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const {username, name, password} = req.body

    if (username.length < 3 || password.length < 3) {
        return res.status(400).json({ error: "Malformatted Inputs"})
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    return res.status(201).json(savedUser)
})

module.exports = usersRouter