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
        if (verified.role === 'CEO') {
            next()
        } else if (verified.role === 'PRODUCT') {
            next()
        } else {
            return res.status(401).json({ message: 'cccccc' })
        }
    } catch (error) {
        res.status(500).send('Invalid token')
    }
}

const router = express.Router()

router.route('/')
    .get(authAdmin, orderAdminController.getFullOrder)

router.route('/search')
    .get(authAdmin, orderAdminController.getSearchOrder)

router.route('/:id')
    .get(authAdmin, orderAdminController.getFullOrderInformation)

router.route('/:id')
    .put(authAdmin, orderAdminValidation.updateOrder, orderAdminController.updateOrder)

router.route('/ratingOrder/:id')
    .put(authAdmin, orderAdminController.ratingOrder)
    
export const orderAdminRoutes = router