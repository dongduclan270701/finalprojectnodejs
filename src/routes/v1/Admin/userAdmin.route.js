import express from 'express'
import { userAdminController } from '*/controllers/Admin/userAdmin.controller'
// import { orderAdminValidation } from '*/validations/orderAdmin.validation'
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
    .get(authAdmin, userAdminController.getFullUser)

// router.route('/search')
//     .get(authAdmin, userAdminController.getSearchOrder)

// router.route('/:id')
//     .get(authAdmin, userAdminController.getFullOrderInformation)

// router.route('/:id')
//     .put(authAdmin, orderAdminValidation.update, userAdminController.update)

export const userAdminRoutes = router