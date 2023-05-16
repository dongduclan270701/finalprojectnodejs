import { cartCustomerService } from '*/services/Customer/cartCustomer.service'
import { HttpStatusCode } from '*/utils/constants'

const getFullCart = async (req, res) => {

    try {
        const data = req.query
        const result = await cartCustomerService.getFullCart(data)
        
        res.status(HttpStatusCode.OK).json(result)

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullCartInformation = async (req, res) => {
    try {
        const { email } = req.params
        const result = await cartCustomerService.getFullCartInformation(email)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const { email } = req.params
        const result = await cartCustomerService.update(email, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const cartCustomerController = { 
    getFullCartInformation, 
    getFullCart, 
    update 
}