import express from 'express'
import { laptopCollectingController } from '*/controllers/Admin/laptopCollecting.controller'
import { laptopCollectingValidation } from '*/validations/laptopCollecting.validation'
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
    .get((req, res) => laptopCollectingController.getFullLaptopCollecting(req, res))
    .post(laptopCollectingValidation.createNew, laptopCollectingController.createNew)

router.route('/search')
    .get((req, res) => laptopCollectingController.getSearchLaptopInformation(req, res))

router.route('/secretAdmin/:id')
    .get(authAdmin, laptopCollectingController.getFullLaptopInformationAdmin)

router.route('/:src')
    .put(laptopCollectingValidation.update, laptopCollectingController.update)

export const laptopCollectingRoutes = router