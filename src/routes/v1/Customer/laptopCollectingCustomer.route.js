import express from 'express'
import { laptopCollectingCustomerController } from '*/controllers/Customer/laptopCollectingCustomer.controller'

const router = express.Router()

router.route('/:id')
    .get(laptopCollectingCustomerController.getFullLaptopInformation)

router.route('/')
    .get(laptopCollectingCustomerController.getBestLaptop)

export const laptopCollectingCustomerRoutes = router