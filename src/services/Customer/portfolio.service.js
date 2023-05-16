import { portfolioModel } from '*/models/Customer/portfolio.model'
import { cloneDeep } from 'lodash'

const getSearchProduct = async (data) => {
    try {
        const portfolio = await portfolioModel.getSearchProduct(data)
        const transformData = cloneDeep(portfolio)
        return transformData
    } catch (error) {
        throw new Error(error)
    }
}

export const portfolioService = { 
    getSearchProduct
}