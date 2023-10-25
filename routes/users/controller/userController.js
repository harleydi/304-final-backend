const User = require('../model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

const register = async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

        let newUser = await new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
            // img: req.body.img
        })
        let savedUser = await newUser.save()
        await savedUser.populate('cases')

        res.status(200).json({ success: true, message: "User Created", user: savedUser })
    } catch (error) {
        if (error.status) {
            res.status(error.status || 500 ).json(error.message)
        } else {
            res.status(500).json({ message: 'Error in Registration', error: error.message})
        }
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        let foundUser = await User.findOne({ email: email })
        if (!foundUser) {
            throw {
                status: 404,
                message: 'User Not Found'
            }
        }

        let checkedPassword = bcrypt.compare(password, foundUser.password)
        if (!checkedPassword) {
            return res.status(500).json({ success: false, message: 'Incorrect Password!'})
        }

        const payload = {
            id: foundUser._id
        }

        let token = await jwt.sign(payload, process.env.SUPER_SECERT_KEY, { expiresIn: 60*60 })
        
        res.status(201).json({ success: true, token: token })
    } catch (error) {
        if (error.status) {
            res.status(error.status || 500 ).json(error.message)
        } else {
            res.status(500).json({ message: 'Unsuccesful Login: ', error: error.message })
        }
    }
}

const validateUser = async (req, res) => {
    try {
        const decodedToken = res.locals.decodedToken
        const foundUser = await User.findOne({ _id: decodedToken.id })

        if (!foundUser) {
            res.status(500).json({ message: 'Error', error: error.message })
        }

        res.status(200).json({ success: true, user: foundUser })
    } catch (error) {
        res.status(500).json({ message: 'Validation Error', error: error.message})
    }
}

const getUserInfo = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const foundUser = await User.findOne({ _id: id })

        if (!foundUser) {
            res.status(500).json({ message: 'User Not Found!', error: error.message})
        }

        const { username, email, cases } = foundUser

        res.status(200).json({ success: true, data: {
            username,
            email,
            cases
        } })
    } catch (error) {
        res.status(500).json({ message: 'Error getting User', error: error.message})
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({ success: true, data: users })
    } catch (error) {
        res.status(500).json({ message: 'Error getting Users', error: error.message})
    }
}

module.exports = { register, login, validateUser, getUserInfo, getAllUsers }