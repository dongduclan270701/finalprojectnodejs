import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

// Define Board collection
const userCollectionName = 'users'
const userCollectionSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    address: Joi.string().default(''),
    phoneNumber: Joi.number().min(10).max(10).default(null),
    email: Joi.string().required(),
    image: Joi.string().default('https://res.cloudinary.com/dolydpat4/image/upload/v1683985614/hsviimyofhc2xjjrni6u.jpg'),
    orders: Joi.array().items(Joi.string()).default([]),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    status: Joi.boolean().default(true),
    _destroy: Joi.boolean().default(false),
    age: Joi.number().default(18),
    lastLogin: Joi.object().default({
        time: Joi.string(),
        date: Joi.string()
    }),
    createdDate: Joi.string()
})

const validateSchema = async (data) => {
    return await userCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNew = async (data) => {
    try {
        
        const value = await validateSchema(data)
        const cart = {
            email: value.email,
            product: [],
            _destroy: false
        }
        const dataFind = await getDB().collection(userCollectionName).aggregate([
            {
                $match: {
                    email: value.email,
                    _destroy: false
                }
            }
        ]).toArray()
        if (dataFind.length > 0) {
            return { message: 'Email đã tồn tại' }
        } else {
            const result = await getDB().collection(userCollectionName).insertOne(value)
            await getDB().collection('cart').insertOne(cart)
            return result
        }
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(userCollectionName).findOne({ _id: ObjectId(id) })
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
        const {_id, ...newUpdateData} = updateData
        const updateUser = await getDB().collection(userCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: newUpdateData },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
}


const getFullUser = async (email) => {
    try {
        const result = await getDB().collection(userCollectionName).aggregate([
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

const getFullUserInformation = async (userId) => {
    try {
        const result = await getDB().collection(userCollectionName).aggregate([
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
export const UserModel = { createNew, getFullUserInformation, getFullUser, update, findOneById }