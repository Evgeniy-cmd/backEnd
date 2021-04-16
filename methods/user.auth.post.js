const express = require("express")
const Router = express.Router()
const { check, validationResult } = require("express-validator")
const { User } = require("../models")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config()

const postUser = Router.post(
     "/user/auth",
  check("email").isEmail(),
  check("password").isString(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send('All forms must be filled') 
      }

      const user = await User.findOne({
        where: { email: req.body.email },
      });

      if (!user) throw new Error('User with this email doesnt exist')

      const token = jwt.sign({ uuid: user.uuid }, process.env.TOKEN_SECRET, {
        expiresIn: 1800,
      });

      res.json({
        token,
        result: {
          uuid: user.uuid,
          firstName: user.firstName,
        },
      });
    } catch (error) {
        console.log(error)
      return res.status(400).send(error.messsage)
    }
  }
)
module.exports = postUser