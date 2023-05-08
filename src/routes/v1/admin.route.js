import express from 'express'
import { adminController } from '*/controllers/admin.controller'
import { AdminValidation } from '*/validations/admin.validation'
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const token = req.header('auth-token-user')
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
    .post( AdminValidation.createNew, adminController.createNew)

router.route('/:email/:password')
    .get(adminController.getFullUser)

router.route('/:id')
    .get(adminController.getFullUserInformation)
    .put(AdminValidation.update, adminController.update)

export const adminRoutes = router