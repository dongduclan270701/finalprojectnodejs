import { orderCustomerService } from '*/services/Customer/orderCustomer.service'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res) => {
    try {
        const data = req.body
        const result = await orderCustomerService.createNew(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullorder = async (req, res) => {
    try {
        const data = req.query
        const result = await orderCustomerService.getFullorder(data)
        
        res.status(HttpStatusCode.OK).json(result)

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullOrderInformation = async (req, res) => {
    try {
        const { id } = req.params
        const result = await orderCustomerService.getFullOrderInformation(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchOrder = async (req, res) => {
    try {
        const data = req.query
        const result = await orderCustomerService.getSearchOrder(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const result = await orderCustomerService.update(id, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const ratingOrder = async (req, res) => {
    try {
        const { id } = req.params
        const result = await orderCustomerService.ratingOrder(id, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const orderCustomerController = { createNew, getSearchOrder, getFullOrderInformation, getFullorder, update, ratingOrder }