import express from 'express'
import { laptopCollectingCustomerController } from '*/controllers/Customer/laptopCollectingCustomer.controller'

const router = express.Router()

router.route('/:id')
    .get(laptopCollectingCustomerController.getFullLaptopInformation)

export const laptopCollectingCustomerRoutes = router