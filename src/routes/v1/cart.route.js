import express from 'express'
import { cartController } from '*/controllers/cart.controller'
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

// router.route('/')
//     .get((req, res) => cartController.getFullCart(req, res))
//     .post(cartValidation.createNew, cartController.createNew)

router.route('/:email')
    .get(cartController.getFullCartInformation)
    .put(cartController.update)

export const cartRoutes = router