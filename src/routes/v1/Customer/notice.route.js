import express from 'express'
import { noticeValidation } from '*/validations/notice.validation'
import { noticeController } from '*/controllers/Customer/notice.controller'
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
    .post(authCustomer, noticeValidation.createNew, noticeController.createNew)

router.route('/fetch/:email')
    .get(authCustomer, noticeController.getFullNotice)
    .put(authCustomer, noticeController.getUpdateNotice)

export const noticeRoutes = router