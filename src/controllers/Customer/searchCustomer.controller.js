import { searchGoodsService } from '*/services/Customer/searchCustomer.service'
import { HttpStatusCode } from '*/utils/constants'

const getSearchGoods = async (req, res) => {
    try {
        const data = req.query
        const result = await searchGoodsService.getSearchGoods(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFilterGoods = async (req, res) => {
    try {
        const data = req.query
        const result = await searchGoodsService.getFilterGoods(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const searchGoodsController = { 
    getSearchGoods,
    getFilterGoods
}