const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("../users/users-model")
const restrict = require("../middleware/restrict")

const router = express.Router()

router.post("/register", async (req, res, next) => {
	try {
		const { username } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

    res.status(201).json(await Users.add(req.body))
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {

	const authError = {
		message: "Invalid Credentials",
	}

	try {
		const { username, password } = req.body

		const user = await Users.findBy({ username }).first()
		if (!user) {
			return res.status(401).json(authError)
		}

		const passwordValid = await bcrypt.compare(password, user.password)
		if (!passwordValid) {
			return res.status(401).json(authError)
		}

		const payload = {
			userId: user.id,
			userRole: user.role,
		}
		
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret")

		res.cookie("token", token)
		
		res.json({
      message: `Welcome ${user.username}!`,
    })
    
	} catch(err) {
		next(err)
	}
})

router.get("/logout", restrict(), (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err)
    } else {
      res.json({
        message: "Successfuly logged out",
      })
    }
  })
})

module.exports = router