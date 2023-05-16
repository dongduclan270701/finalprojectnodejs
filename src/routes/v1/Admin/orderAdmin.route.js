import express from 'express'
import { orderAdminController } from '*/controllers/Admin/orderAdmin.controller'
import { orderAdminValidation } from '*/validations/orderAdmin.validation'
import jwt from 'jsonwebtoken'

const authAdmin = (req, res, next) => {
    const token = req.header('auth-token-admin')
    if (!token) {
        return res.status(401).send('Access Denied')
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_ADMIN)
        req.result = verified
        next()
    } catch (error) {
        res.status(500).send('Invalid token')
    }
}

const router = express.Router()

router.route('/')
    .get(authAdmin, orderAdminController.getFullorder)
    .post(orderAdminValidation.createNew, orderAdminController.createNew)

router.route('/search')
    .get(authAdmin, orderAdminController.getSearchOrder)

router.route('/:id')
    .get(authAdmin, orderAdminController.getFullOrderInformation)

router.route('/:id')
    .put(authAdmin, orderAdminValidation.update, orderAdminController.update)

export const orderAdminRoutes = router