import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'
import crypto from 'crypto'

// Define Board collection
const orderName = 'order'
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
    createBy: Joi.object(),
    updateAt: Joi.date().timestamp().default(null),
    updateBy: Joi.object().default({}),
    reasonCancel: Joi.string().default(''),
    _destroy: Joi.boolean().default(false),
    statusReview: Joi.object().default({
        status: false,
        product: []
    }),
    orderId: Joi.string()
})

const validateSchema = async (data) => {
    return await orderSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNew = async (data) => {
    try {
        // console.log(data)
        const id = crypto.randomBytes(12).toString('hex')
        const newData = { ...data, orderId: id }
        // console.log(newData)
        data.product.map(async (item, index) => {
            const updateProduct = await getDB().collection(item.collection).findOneAndUpdate(
                { src: item.src },
                { $inc: { sold: item.quantity, quantity: -item.quantity } },
                { returnDocument: 'after' }
            )
            return updateProduct
        })

        const value = await validateSchema(newData)
        const result = await getDB().collection(orderName).insertOne(value)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(orderName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const findUserAndUpdateOrderList = async (email, data) => {
    try {
        const newData = {
            orderId: data.orderId,
            product: [
                {
                    img: data.product[0].img[0],
                    nameProduct: data.product[0].nameProduct,
                    src: data.product[0].src,
                    quantity: data.product[0].quantity,
                    nowPrice: data.product[0].nowPrice,
                    collection: data.product[0].collection
                }],
            shipping_process: data.shipping_process,
            status: data.status,
            sumOrder: data.sumOrder,
            ship: data.ship
        }
        const updateUser = await getDB().collection('users').findOneAndUpdate(
            { email: email },
            { $push: { orders: newData } },
            { returnDocument: 'after' }
        )
        return updateUser.value
    }
    catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now()
        }
        const { _id, ...newUpdateData } = updateData
        // console.log(newUpdateData)
        const updateOrder = await getDB().collection(orderName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: newUpdateData },
            { returnDocument: 'after' }
        )
        await getDB().collection('users').findOneAndUpdate(
            { 'orders.orderId': newUpdateData.orderId },
            { $set: { 'orders.$.status': newUpdateData.status } },
            { returnDocument: 'after' }
        );
        return updateOrder.value
    } catch (error) {
        throw new Error(error)
    }
}

const ratingOrder = async (id, data) => {
    try {
        const updateOrder = await getDB().collection(orderName).findOneAndUpdate(
            { orderId: id },
            { $set: { statusReview: data } },
            { returnDocument: 'after' }
        )
        return updateOrder.value
    } catch (error) {
        throw new Error(error)
    }
}

const getFullorder = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(orderName).find().limit(perPage).skip((perPage * page) - perPage).toArray()
        const resultTotal = await getDB().collection(orderName).find().toArray()
        return { data: [...result], total: resultTotal.length }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullOrderInformation = async (id) => {
    try {
        const result = await getDB().collection(orderName).aggregate([
            {
                $match: {
                    orderId: id,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found order' }
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchOrder = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(orderName).aggregate([
            {
                $match: {
                    status: { $regex: new RegExp(`${data.status === 'Chọn trạng thái' ? '' : data.status}`) },
                    'shipping_process': {
                        $elemMatch: {
                            date: {
                                $gte: data.firstDate,
                                $lte: data.endDate
                            },
                            content: 'Ordered'
                        }
                    },
                    orderId: { $regex: new RegExp(`${data.orderId}`) },
                    _destroy: false
                }
            }
        ]).skip((perPage * page) - perPage).limit(perPage).toArray()
        const resultTotal = await getDB().collection(orderName).aggregate([
            {
                $match: {
                    status: data.status,
                    'shipping_process': {
                        $elemMatch: {
                            date: {
                                $gte: data.firstDate,
                                $lte: data.endDate
                            },
                            content: 'Ordered'
                        }
                    },
                    orderId: { $regex: new RegExp(`${data.orderId}`) },
                    _destroy: false
                }
            }
        ]).toArray()
        return { data: [...result], total: resultTotal.length }
    } catch (error) {
        throw new Error(error)
    }
}
export const orderCustomerModel = { createNew, findUserAndUpdateOrderList, getFullOrderInformation, getFullorder, update, findOneById, getSearchOrder, ratingOrder }