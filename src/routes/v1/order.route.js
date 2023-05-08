import express from 'express'
import { orderController } from '*/controllers/order.controller'
import { orderValidation } from '*/validations/order.validation'
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
    .get((req, res) => orderController.getFullorder(req, res))
    .post(orderValidation.createNew, orderController.createNew)

router.route('/search')
    .get((req, res) => orderController.getSearchOrder(req, res))

router.route('/:id')
    .get(orderController.getFullOrderInformation)

router.route('/:id')
    .put(orderValidation.update, orderController.update)

export const orderRoutes = router