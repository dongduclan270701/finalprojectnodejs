import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'
import crypto from 'crypto'

// Define Board collection
const cartName = 'cart'
const orderSchema = Joi.object({
    product: Joi.array().required().items(Joi.object()),
    email: Joi.string().required(),
    username: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    commune: Joi.string().required(),
    discountCode: Joi.array().items(Joi.string()),
    shipping_process: Joi.array().required().items(Joi.object({
        time: Joi.string().required(),
        date: Joi.string().required(),
        content: Joi.string().required()
    })),
    method_payment: Joi.string().required(),
    ship: Joi.number().required(),
    sumOrder: Joi.number().required(),
    status: Joi.string(),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false),
    orderId: Joi.string()
})

const update = async (email, data) => {
    try {
        const updateCart = await getDB().collection(cartName).findOneAndUpdate(
            { email: email },
            { $set: { product: data } },
            { returnDocument: 'after' }
        )
        return updateCart.value
    } catch (error) {
        throw new Error(error)
    }
}

const getFullCart = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(cartName).find().limit(perPage).skip((perPage * page) - perPage).toArray()
        const resultTotal = await getDB().collection(cartName).find().toArray()
        return { data: [...result], total: resultTotal.length }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullCartInformation = async (email) => {
    try {
        const result = await getDB().collection(cartName).aggregate([
            {
                $match: {
                    email: email,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found cart' }
    } catch (error) {
        throw new Error(error)
    }
}

export const cartCustomerModel = { getFullCartInformation, getFullCart, update }