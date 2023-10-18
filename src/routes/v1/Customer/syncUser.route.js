import express from 'express'
import { syncUserController } from '*/controllers/Customer/syncUser.controller'
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

router.route('/syncUser')
    .get(authUser, syncUserController.syncUser)

export const syncUserRoutes = router