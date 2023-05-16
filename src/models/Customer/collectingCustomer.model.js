// import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
const userCollectionName = 'collecting'
// const userCollectionSchema = Joi.object({
//     username: Joi.string().required().min(3).max(20),
//     password: Joi.string().required(),
//     address: Joi.string().default(''),
//     phoneNumber: Joi.number().min(10).max(10),
//     email: Joi.string().required(),
//     orders: Joi.array().items(Joi.string()).default([]),
//     createAt: Joi.date().timestamp().default(Date.now()),
//     updateAt: Joi.date().timestamp().default(null),
//     status: Joi.boolean().default(true),
//     _destroy: Joi.boolean().default(false)
// })

// const validateSchema = async (data) => {
//     return await userCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
// }

const getCollectingByName = async (name) => {
    try {
        const result = await getDB().collection(userCollectionName).aggregate([
            {
                $match: {
                    name: name
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found collecting' }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullCollection = async () => {
    try {
        const result = await getDB().collection(userCollectionName).find({}).toArray()
        return result
    } catch (error) {
        throw new Error(error)
    }
}
export const collectingCustomerModel = { 
    getFullCollection,
    getCollectingByName
}