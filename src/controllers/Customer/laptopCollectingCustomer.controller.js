import { laptopCollectingCustomerService } from '*/services/Customer/laptopCollectingCustomer.service'
import { HttpStatusCode } from '*/utils/constants'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const getFullLaptopInformation = async (req, res) => {
    try {
        const { id } = req.params
        const result = await laptopCollectingCustomerService.getFullLaptopInformation(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getBestLaptop = async (req, res) => {
    try {
        const result = await laptopCollectingCustomerService.getBestLaptop()
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const laptopCollectingCustomerController = {
    getFullLaptopInformation,
    getBestLaptop
}