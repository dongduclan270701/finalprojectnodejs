import express from 'express'
import { searchGoodsController } from '*/controllers/Customer/searchCustomer.controller'
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

//router user
// router.route('/:email')
//     .get(authCustomer, cartCustomerController.getFullCartInformation)
//     .put(authCustomer, cartCustomerController.update)
router.route('/searchGoods')
    .get(searchGoodsController.getSearchGoods)

router.route('/filterGoods')
    .get(searchGoodsController.getFilterGoods)
export const searchGoodsRoutes = router