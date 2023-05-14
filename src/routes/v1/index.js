import express from 'express'
import { HttpStatusCode } from '*/utils/constants'
import { userRoutes } from './user.route'
import { collectingRoutes } from './collecting.route'
import { laptopCollectingRoutes } from './laptopCollecting.route'
import { orderRoutes } from './order.route'
import { adminRoutes } from './admin.route'
import { portfolioRoutes } from './portfolio.route'
import { cartRoutes } from './cart.route'
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

router.use('/collecting', collectingRoutes)

router.use('/laptopCollecting', laptopCollectingRoutes)

router.use('/searchCustomer', portfolioRoutes)

router.use('/order', orderRoutes)

router.use('/cart', cartRoutes)
export const apiV1 = router