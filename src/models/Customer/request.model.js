import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

const requestWebsiteCollectionName = 'requestWebsite'
const requestAdsCollectionName = 'requestAds'
const accountUserCollectionSchema = Joi.object({
    dateRequest: Joi.string(),
    count: Joi.number().default(1),
    _destroy: Joi.boolean().default(false)
})
const validateSchema = async (data) => {
    return await accountUserCollectionSchema.validateAsync(data, { abortEarly: false }) // Hiển thị đầy đủ lỗi nếu trong trường data có 2 field trở lên bị lỗi
}

const createNewRequestWebsite = async () => {
    try {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()
        const newData = {
            dateRequest: `${year}-${month}-${day}`
        }
        const value = await validateSchema(newData)
        const dataFind = await getDB().collection(requestWebsiteCollectionName).aggregate([
            {
                $match: {
                    dateRequest: newData.dateRequest,
                    _destroy: false
                }
            }
        ]).toArray()
        if (dataFind.length > 0) {
            const result = await getDB().collection(requestWebsiteCollectionName).findOneAndUpdate(
                { dateRequest: newData.dateRequest },
                { $inc: { count: 1 } },
                { returnDocument: 'after' }
            )
            return result
        } else {
            const result = await getDB().collection(requestWebsiteCollectionName).insertOne(value)
            return result
        }

    } catch (error) {
        throw new Error(error);
    }
};

const findOneByIdRequestWebsite = async (id) => {
    try {
        const result = await getDB().collection(requestWebsiteCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const createNewRequestAds = async () => {
    try {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()
        const newData = {
            dateRequest: `${year}-${month}-${day}`
        }
        const value = await validateSchema(newData)
        const dataFind = await getDB().collection(requestAdsCollectionName).aggregate([
            {
                $match: {
                    dateRequest: newData.dateRequest,
                    _destroy: false
                }
            }
        ]).toArray()
        if (dataFind.length > 0) {
            const result = await getDB().collection(requestAdsCollectionName).findOneAndUpdate(
                { dateRequest: newData.dateRequest },
                { $inc: { count: 1 } },
                { returnDocument: 'after' }
            )
            return result
        } else {
            const result = await getDB().collection(requestAdsCollectionName).insertOne(value)
            return result
        }

    } catch (error) {
        throw new Error(error);
    }
};

const findOneByIdRequestAds = async (id) => {
    try {
        const result = await getDB().collection(requestAdsCollectionName).findOne({ _id: ObjectId(id) })
        return result
    } catch (error) {
        throw new Error(error)
    }
}


export const RequestModel = {
    createNewRequestWebsite,
    findOneByIdRequestWebsite,
    createNewRequestAds,
    findOneByIdRequestAds
}