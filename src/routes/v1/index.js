import express from 'express'
import { HttpStatusCode } from '*/utils/constants'
import { userRoutes } from './Customer/user.route'
import { collectingCustomerRoutes } from './Customer/collectingCustomer.route'
import { laptopCollectingCustomerRoutes } from './Customer/laptopCollectingCustomer.route'
import { orderCustomerRoutes } from './Customer/orderCustomer.route'
import { portfolioRoutes } from './Customer/portfolio.route'
import { cartCustomerRoutes } from './Customer/cartCustomer.route'
import { chatRoutes } from './Chat/Chat.route'
const router = express.Router()

// GET v1/status
router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({
    status: 'OK'
}))

//User APIs
router.use('/users', userRoutes)

router.use('/collecting', collectingCustomerRoutes)

router.use('/laptopCollectingCustomer', laptopCollectingCustomerRoutes)

router.use('/searchCustomer', portfolioRoutes)

router.use('/orderUser', orderCustomerRoutes)

router.use('/cartCustomer', cartCustomerRoutes)

router.use('/chat', chatRoutes)

export const apiV1 = router