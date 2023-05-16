import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'

const getSearchProduct = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(data.collection).aggregate([
            {
                $match: {
                    // nameProduct: { $regex: new RegExp(`${''}`) },
                    category: { $all: [data.category] },
                    _destroy: false
                }
            }
        ]).skip((perPage * page) - perPage).limit(perPage).toArray()
        const resultTotal = await getDB().collection(data.collection).aggregate([
            {
                $match: {
                    category: { $all: [data.category] },
                    _destroy: false
                }
            }
        ]).toArray()
        return { data: [...result], total: resultTotal.length }
    } catch (error) {
        throw new Error(error)
    }
}

export const portfolioModel = {
    getSearchProduct
}