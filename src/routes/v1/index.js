import express from 'express'
import { HttpStatusCode } from '*/utils/constants'
import { userRoutes } from './Customer/user.route'
import { collectingCustomerRoutes } from './Customer/collectingCustomer.route'
import { laptopCollectingRoutes } from './Admin/laptopCollecting.route'
import { laptopCollectingCustomerRoutes } from './Customer/laptopCollectingCustomer.route'
import { orderAdminRoutes } from './Admin/orderAdmin.route'
import { adminRoutes } from './Admin/admin.route'
import { portfolioRoutes } from './Customer/portfolio.route'
import { cartCustomerRoutes } from './Customer/cartCustomer.route'
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

// GET v1/status
router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({
    status: 'OK'
}))

//User APIs
router.use('/users', userRoutes)

router.use('/admin', adminRoutes)

router.use('/collecting', collectingCustomerRoutes)

router.use('/laptopCollecting', laptopCollectingRoutes)

router.use('/laptopCollectingCustomer', laptopCollectingCustomerRoutes)

router.use('/searchCustomer', portfolioRoutes)

router.use('/orderAdmin', orderAdminRoutes)

router.use('/cartCustomer', cartCustomerRoutes)
export const apiV1 = router