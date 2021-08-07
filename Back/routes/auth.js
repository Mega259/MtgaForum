import express from 'express'
import db from '../controllers/mongoController.js'
import jwt from 'jsonwebtoken'

let router = express.Router();
const User = db.user

router.post('/signup', async function (req, res, next) {
  try {
    if (req.body.password !== req.body.passwordConf) {
      return res.status(400).send({ message: "Passwords do not match" })
    }
    if (req.body.email && req.body.username && req.body.password && req.body.passwordConf) {
      try {
        const userDb = await new User({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          banned: false,
          validated: false,
          role: 2
        }).save()
        return res.send({ message: "user created successfully" })
      } catch (err) {
        console.log(err)
        res.status(500).send({ message: `${Object.keys(err.keyPattern)[0]} is already on the database` })
      }
    } else {
      res.status(404).send({ message: "Incomplete data" })
    }
  } catch (err) {
    return res.status(400).send({ message: err.message })
  }
})

router.post('/signin', async function (req, res, next) {
  try {
    if (req.body.logemail && req.body.logpass) {
      const user = await User.authenticate(req.body.logemail, req.body.logpass)
      req.session.userId = user._id
      const token = jwt.sign({
        name: user.name,
        id: user._id,
        role: user.role
      },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" }
      )

      return res.status(200).header("auth-token", token).send({ message: "logged", data: { token } })
    } else {
      return res.status(400).send({ message: "All parameters needed" })
    }
  } catch (err) {
    return res.status(400).send({ message: err.message })
  }
})

router.get('/signout', async function (req, res, next) {
  try {
    if (req.session) {
      req.session.destroy()
      return res.status(200).send({ message: "Sign out" })
    } else {
      return res.status(400).send({ message: "No session active" })
    }
  } catch (err) {
    return res(400).send({ message: err.message })
  }
})

export default router