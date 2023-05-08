import express from 'express'
import { collectingController } from '*/controllers/collecting.controller'
import { laptopCollectingValidation } from '*/validations/user.validation'
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

router.route('/:name')
    .get(collectingController.getCollectingByName)

export const collectingRoutes = router