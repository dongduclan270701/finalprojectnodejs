import express from 'express'
import { portfolioController } from '*/controllers/portfolio.controller'
// import { portfolioValidation } from '*/validations/portfolio.validation'
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

// router.route('/')
//     .get((req, res) => portfolioController.getFullportfolio(req, res))
//     .post(portfolioValidation.createNew, portfolioController.createNew)

router.route('/search')
    .get((req, res) => portfolioController.getSearchProduct(req, res))

// router.route('/:id')
//     .get(portfolioController.getFullLaptopInformation)

// router.route('/secretAdmin/:id')
//     .get(authAdmin, portfolioController.getFullLaptopInformationAdmin)

// router.route('/:src')
//     .put(portfolioValidation.update, portfolioController.update)

export const portfolioRoutes = router