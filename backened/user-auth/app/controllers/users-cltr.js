import User from '../models/user-model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
const usersCltr = {}

usersCltr.register = async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        const user = new User({ email, password })
        const salt = await bcryptjs.genSalt()
        const hash = await bcryptjs.hash(password, salt)
        user.password = hash
        await user.save()
        res.status(201).json(user)
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'something went wrong'})
    }
}

usersCltr.login = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }
    const { email, password } = req.body
    try {
       const user = await User.findOne ({ email }) 
       if(!user) {
        return res.status(404).json({ errors: 'invalid email or password'})
       }
       const isVerified = await bcryptjs.compare(password, user.password)
       if(!isVerified) {
        return res.status(404).json({ errors: 'invalid email or password'})
       }
       const tokenData = { userId: user._id }
       const token = jwt.sign(tokenData, process.env.JWT_SECRET , { expiresIn: '7d'})
       res.json({ token: token }) 
    } catch(err) {
        console.log(err)
        res.status(500).json({ errors: 'something went wrong'})
    }
}

usersCltr.profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        res.json(user)
    } catch(err) {
        console.log(err)
        res.status(500).json({ errors: 'something went wrong'})
    }
}
export default usersCltr
