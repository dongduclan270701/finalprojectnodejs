import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'
import crypto from 'crypto'

// Define Board collection
const noticeName = 'notice'
const orderSchema = Joi.object({
    product: Joi.object(),
    email: Joi.string().required(),
    time: Joi.string().required(),
    date: Joi.string().required(),
    content: Joi.string().required(),
    status: Joi.string().required(),
    _destroy: Joi.boolean().default(false),
    orderId: Joi.string(),
    createDate: Joi.string(),
    isRead: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await orderSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNew = async (data) => {
    try {
        console.log(data)
        const value = await validateSchema(data)
        const result = await getDB().collection(noticeName).insertOne(value)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getFullNotice = async (data) => {
    try {
        const result = await getDB().collection(noticeName).aggregate([
            {
                $match: {
                    email: data.email,
                    _destroy: false
                }
            }
        ]).toArray()
        console.log(result)
        return result
    } catch (error) {
        throw new Error(error)
    }

}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(noticeName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}


export const noticeModel = {
    createNew,
    findOneById,
    getFullNotice
}