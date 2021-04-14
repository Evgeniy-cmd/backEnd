const express = require("express")
const Router = express.Router()
const { check, validationResult } = require("express-validator")
const { User } = require("../models/user")
const jwt = require("jsonwebtoken")

const postUser = Router.post(
    "/",
    check("firstName").isString(),
    check("lastName").isString(),
    check("email").isEmail(),
    check("password").isString(),
  
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
              return res.status(422).json({ errors: errors.array()[0].msg })
            }
            const checkIfExist = await User.findOne({
              where: { email: req.body.email },
            });
            
            if (checkIfExist) throw new Error("User with this email already exist")

              const createUser = await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
              })
      
              const token = jwt.sign({ uuid: createUser.uuid }, process.env.SECRET, {
                expiresIn: 180,
              })
      
              res.send({
                token,
                result: {
                  uuid: createUser.uuid,
                  firstName: createUser.firstName,
                },
              })
            
          } catch (error) {
            return res.status(400).json({ error: error.message })
          }
        }
      );
      module.exports = postUser