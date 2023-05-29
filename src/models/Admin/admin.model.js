import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

const employeeCollectionName = 'admin'
const employeeCollectionSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    address: Joi.string().default(''),
    phoneNumber: Joi.number().default(0),
    role: Joi.string().required(),
    email: Joi.string().required(),
    image: Joi.string().default(''),
    identity: Joi.number().default(0),
    salary: Joi.number().default(0),
    curriculumVitae: Joi.string().default(''),
    createdAt: Joi.date().timestamp().default(Date.now()),
    createdBy: Joi.string().default(''),
    updatedAt: Joi.date().timestamp().default(null),
    updatedBy: Joi.string().default(''),
    reasonUpdate: Joi.string().default(''),
    status: Joi.boolean().default(true),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async (data) => {
    return await employeeCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNewEmployee = async (data) => {
    try {
        const value = await validateSchema(data)
        const dataFind = await getDB().collection(employeeCollectionName).aggregate([
            {
                $match: {
                    email: value.email,
                    _destroy: false
                }
            }
        ]).toArray()
        if (dataFind.length > 0) {
            return { message: 'Email already exists' }
        } else {
            const result = await getDB().collection(employeeCollectionName).insertOne(value)
            return result
        }
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await getDB().collection(employeeCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const updateEmployee = async (id, data) => {
    try {
        const updateData = {
            ...data
        }
        const updateUser = await getDB().collection(employeeCollectionName).findOneAndUpdate(
            { _id: ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
}


const loginEmployee = async (email) => {
    try {
        
        const result = await getDB().collection(employeeCollectionName).aggregate([
            {
                $match: {
                    email: email,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found employee' }
    } catch (error) {
        throw new Error(error)
    }
}

const getInformationEmployee = async (employeeId) => {
    try {
        const result = await getDB().collection(employeeCollectionName).aggregate([
            {
                $match: {
                    _id: ObjectId(employeeId),
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found employee' }
    } catch (error) {
        throw new Error(error)
    }
}

const getAllEmployee = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(employeeCollectionName).find().limit(perPage).skip((perPage * page) - perPage).toArray()
        const resultTotal = await getDB().collection(employeeCollectionName).find().toArray()
        return { data: [...result], total: resultTotal.length }
    } catch (error) {
        throw new Error(error)
    }
}
export const AdminModel = { 
    getAllEmployee,
    createNewEmployee, 
    getInformationEmployee, 
    loginEmployee, 
    updateEmployee, 
    findOneById 
}