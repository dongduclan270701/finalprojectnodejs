import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

// Define Board collection
const userCollectionName = 'users'

const update = async (id, data) => {
    try {
        const updateData = {
            ...data
        }
        const updateUser = await getDB().collection(userCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
}


const getFullUser = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(userCollectionName).find({}).skip((perPage * page) - perPage).limit(perPage).toArray()
        const resultTotal = await getDB().collection(userCollectionName).find({}).toArray()
        return { data: [...result], total: resultTotal.length }
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

export const userAdminModel = { 
    getFullUser
}