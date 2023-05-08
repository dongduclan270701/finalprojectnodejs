import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

// Define Board collection
const adminCollectionName = 'admin'
const adminCollectionSchema = Joi.object({
    username: Joi.string().required().min(3).max(20),
    password: Joi.string().required(),
    address: Joi.string().default(''),
    phoneNumber: Joi.number().min(10).max(10),
    email: Joi.string().required(),
    createAt: Joi.date().timestamp().default(Date.now()),
    updateAt: Joi.date().timestamp().default(null),
    status: Joi.boolean().default(true),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await adminCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNew = async (data) => {
    try {
        const value = await validateSchema(data)
        const dataFind = await getDB().collection(adminCollectionName).aggregate([
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
            const result = await getDB().collection(adminCollectionName).insertOne(value)
            return result
        }
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(adminCollectionName).findOne({ _id: ObjectId(id) })
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
        const updateUser = await getDB().collection(adminCollectionName).findOneAndUpdate(
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
        
        const result = await getDB().collection(adminCollectionName).aggregate([
            {
                $match: {
                    email: email,
                    _destroy: false
                }
            }
        ]).toArray()
        console.log(result)
        return result[0] || { message: 'Not found user' }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullUserInformation = async (userId) => {
    try {
        const result = await getDB().collection(adminCollectionName).aggregate([
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
export const AdminModel = { createNew, getFullUserInformation, getFullUser, update, findOneById }