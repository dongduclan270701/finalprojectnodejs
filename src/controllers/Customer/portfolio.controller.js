import { portfolioService } from '*/services/Customer/portfolio.service'
import { HttpStatusCode } from '*/utils/constants'

const getSearchProduct = async (req, res) => {
    try {
        const data = req.query
        const result = await portfolioService.getSearchProduct(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const portfolioController = { 
    getSearchProduct 
}