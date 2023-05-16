import express from 'express'
import { portfolioController } from '*/controllers/Customer/portfolio.controller'

const router = express.Router()

router.route('/search')
    .get(portfolioController.getSearchProduct)

export const portfolioRoutes = router