import express from 'express'
import { userController } from '*/controllers/user.controller'
import { UserValidation } from '*/validations/user.validation'
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send('Access Denied')
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.result = verified
        next()
    } catch (error) {
        res.status(500).send('Invalid token')
    }
}

const router = express.Router()

router.route('/')
    .post( UserValidation.createNew, userController.createNew)

router.route('/:email/:password')
    .get(userController.getFullUser)

router.route('/:id')
    .get(userController.getFullUserInformation)
    .put(UserValidation.update, userController.update)

export const userRoutes = router