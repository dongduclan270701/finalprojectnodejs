import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

// Define Board collection
const laptopCollectionName = 'laptop'
const laptopCollectionSchema = Joi.object({
    img: Joi.array().items(Joi.string()).required(),
    src: Joi.string().required(),
    gift: Joi.array().required().items(Joi.string()),
    gift_buy: Joi.array().required().items(Joi.string()),
    percent: Joi.number().min(0).max(100).required(),
    quantity: Joi.number().integer().min(0).required(),
    sold: Joi.number().integer().min(0),
    view: Joi.number().integer().min(0),
    nameProduct: Joi.string().required().required(),
    realPrice: Joi.number().min(0).required(),
    nowPrice: Joi.number().min(0).required(),
    description_table: Joi.array().required().items(Joi.array().ordered(Joi.string(), Joi.string())),
    description: Joi.array().required().items(Joi.array().ordered(Joi.string(), Joi.string())),
    category: Joi.array().required().items(Joi.string()),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await laptopCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        // const dataFind = await getDB().collection(laptopCollectionName).aggregate([
        //     {
        //         $match: {
        //             email: value.email,
        //             _destroy: false
        //         }
        //     }
        // ]).toArray()
        // if (dataFind.length > 0) {
        //     return { message: 'Email đã tồn tại' }
        // } else {
        console.log(data)
        const result = await getDB().collection(laptopCollectionName).insertOne(value)
        return result
        // }
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(laptopCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data
        }
        const updateUser = await getDB().collection(laptopCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
}


const getFullUser = async (email) => {
    try {
        const result = await getDB().collection(laptopCollectionName).aggregate([
            {
                $match: {
                    email: email,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found user' }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullLaptopInformation = async (userId) => {
    try {
        const result = await getDB().collection(laptopCollectionName).aggregate([
            {
                $match: {
                    _id: ObjectId(userId),
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found user' }
    } catch (error) {
        throw new Error(error)
    }
}
export const laptopCollectingModel = { createNew, getFullLaptopInformation, getFullUser, update, findOneById }