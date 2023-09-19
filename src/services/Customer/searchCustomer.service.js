import { searchGoodsModel } from '*/models/Customer/searchCustomer.model'
import { cloneDeep } from 'lodash'

const getFilterGoods = async (data) => {
    try {
        const portfolio = await searchGoodsModel.getFilterGoods(data)
        const transformData = cloneDeep(portfolio)
        return transformData
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchGoods = async (data) => {
    try {
        const portfolio = await searchGoodsModel.getSearchGoods(data)
        const transformData = cloneDeep(portfolio)
        return transformData
    } catch (error) {
        throw new Error(error)
    }
}

export const searchGoodsService = { 
    getFilterGoods,
    getSearchGoods
}