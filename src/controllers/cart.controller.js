import { cartService } from '*/services/cart.service'
import { HttpStatusCode } from '*/utils/constants'

const getFullCart = async (req, res) => {

    try {
        const data = req.query
        const result = await cartService.getFullCart(data)
        
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
        const result = await cartService.getFullCartInformation(email)
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
        const result = await cartService.update(email, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const cartController = { 
    getFullCartInformation, 
    getFullCart, 
    update 
}