import express from 'express'
import { laptopCollectingController } from '*/controllers/laptopCollecting.controller'
import { laptopCollectingValidation } from '*/validations/laptopCollecting.validation'
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    const token = req.header('auth-token')
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

router.route('/')
    .post(auth, laptopCollectingValidation.createNew, laptopCollectingController.createNew)

router.route('/:id')
    .get(laptopCollectingController.getFullLaptopInformation)
    .put(auth, laptopCollectingValidation.update, laptopCollectingController.update)

export const laptopCollectingRoutes = router