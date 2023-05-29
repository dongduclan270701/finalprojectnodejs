import express from 'express'
import { orderAdminValidation } from '*/validations/orderAdmin.validation'
import { orderCustomerController } from '*/controllers/Customer/orderCustomer.controller'
import jwt from 'jsonwebtoken'

const authCustomer = (req, res, next) => {
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
    .get(authCustomer, orderCustomerController.getFullorder)
    .post(authCustomer, orderAdminValidation.createNew, orderCustomerController.createNew)

router.route('/search')
    .get(authCustomer, orderCustomerController.getSearchOrder)

router.route('/:id')
    .get(authCustomer, orderCustomerController.getFullOrderInformation)

router.route('/:id')
    .put(authCustomer, orderCustomerController.update)

router.route('/ratingOrder/:id')
    .put(authCustomer, orderCustomerController.ratingOrder)

export const orderCustomerRoutes = router