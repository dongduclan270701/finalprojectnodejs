import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'

const getSearchProduct = async (data) => {
    try {
        if (JSON.stringify(data.category) === JSON.stringify([ '', '', '', '', '' ])) {
            const result = await getDB().collection(data.collection).aggregate([
                {
                    $match: {
                        _destroy: false
                    }
                }
            ]).toArray()
            const resultTotal = await getDB().collection(data.collection).aggregate([
                {
                    $match: {
                        _destroy: false
                    }
                }
            ]).toArray()
            return { data: [...result], total: resultTotal.length }
        } else {
            const result = await getDB().collection(data.collection).aggregate([
                {
                    $match: {
                        // nameProduct: { $regex: new RegExp(`${''}`) },
                        category: { $all: [data.category] },
                        _destroy: false
                    }
                }
            ]).toArray()
            const resultTotal = await getDB().collection(data.collection).aggregate([
                {
                    $match: {
                        category: { $all: [data.category] },
                        _destroy: false
                    }
                }
            ]).toArray()
            return { data: [...result], total: resultTotal.length }
        }
    } catch (error) {
        throw new Error(error)
    }
}

export const portfolioModel = {
    getSearchProduct
}