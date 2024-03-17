import express from 'express'
import { HttpStatusCode } from '*/utils/constants'
import { userRoutes } from './Customer/user.route'
import { syncUserRoutes } from './Customer/syncUser.route'
import { collectingCustomerRoutes } from './Customer/collectingCustomer.route'
import { laptopCollectingCustomerRoutes } from './Customer/laptopCollectingCustomer.route'
import { orderCustomerRoutes } from './Customer/orderCustomer.route'
import { portfolioRoutes } from './Customer/portfolio.route'
import { searchGoodsRoutes } from './Customer/searchCustomer.route'
import { cartCustomerRoutes } from './Customer/cartCustomer.route'
import { chatRoutes } from './Chat/Chat.route'
import { noticeRoutes } from './Customer/notice.route'
import { ipRoutes } from './Customer/ip.route'
import { requestRoutes } from './Customer/request.route'
const router = express.Router()

// GET v1/status
router.get('/status', (req, res) => res.status(HttpStatusCode.OK).json({
    status: 'OK'
}))

//User APIs
router.use('/users', userRoutes)

router.use('/syncUser', syncUserRoutes)

router.use('/collecting', collectingCustomerRoutes)

router.use('/laptopCollectingCustomer', laptopCollectingCustomerRoutes)

router.use('/searchCustomer', portfolioRoutes)

router.use('/searchGoods', searchGoodsRoutes)

router.use('/orderUser', orderCustomerRoutes)

router.use('/cartCustomer', cartCustomerRoutes)

router.use('/chat', chatRoutes)

router.use('/notice', noticeRoutes)

router.use('/ip', ipRoutes)
router.use('/request', requestRoutes)

export const apiV1 = router