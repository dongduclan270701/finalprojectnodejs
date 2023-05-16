import express from 'express'
import { userController } from '*/controllers/Customer/user.controller'
import { UserValidation } from '*/validations/user.validation'
import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    const token = req.header('auth-token-user')
    if (!token) {
        return res.status(401).send('Access Denied')
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_CUSTOMER)
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

router.route('/:email')
    .get(authUser, userController.getFullUserInformation)
    .put(authUser, UserValidation.update, userController.update)

export const userRoutes = router