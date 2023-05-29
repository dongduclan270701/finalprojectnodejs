import express from 'express'
import { adminController } from '*/controllers/Admin/admin.controller'
import { AdminValidation } from '*/validations/admin.validation'

const router = express.Router()

router.route('/')
    .get(adminController.getAllEmployee)
    .post(AdminValidation.createNewEmployee, adminController.createNewEmployee)

router.route('/:email/:password')
    .get(adminController.loginEmployee)

router.route('/:id')
    .get(adminController.getInformationEmployee)
    .put(AdminValidation.updateEmployee, adminController.updateEmployee)

export const adminRoutes = router