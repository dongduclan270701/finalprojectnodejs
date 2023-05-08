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
    sold: Joi.number().integer().min(0).default(0),
    view: Joi.number().integer().min(0).default(0),
    nameProduct: Joi.string().required().required(),
    realPrice: Joi.number().min(0).required(),
    nowPrice: Joi.number().min(0).required(),
    description_table: Joi.array().required().items(Joi.array().ordered(Joi.string(), Joi.string())),
    description: Joi.array().required().items(Joi.array().ordered(Joi.string(), Joi.string())),
    category: Joi.array().required().items(Joi.string()),
    collection: Joi.string().default(laptopCollectionName),
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

const update = async (src, data) => {
    try {
        const updateData = {
            ...data
        }
        const srcGet = src
        const updateUser = await getDB().collection(laptopCollectionName).findOneAndUpdate(
            { src: srcGet },
            { $set: updateData },
            { returnDocument: 'after' }
        )
        return updateUser.value
    } catch (error) {
        throw new Error(error)
    }
}


const getFullLaptopCollecting = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        const result = await getDB().collection(laptopCollectionName).find().limit(perPage).skip((perPage * page) - perPage).toArray()
        const resultTotal = await getDB().collection(laptopCollectionName).find().toArray()
        return { data: [...result], total: resultTotal.length }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullLaptopInformation = async (src) => {
    try {
        await getDB().collection(laptopCollectionName).findOneAndUpdate(
            { src: src },
            { $inc: { view: 1 } },
            { returnDocument: 'after' }
        )
        const result = await getDB().collection(laptopCollectionName).aggregate([
            {
                $match: {
                    src: src,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found user' }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullLaptopInformationAdmin = async (src) => {
    try {
        const result = await getDB().collection(laptopCollectionName).aggregate([
            {
                $match: {
                    src: src,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0] || { message: 'Not found user' }
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchLaptopInformation = async (data) => {
    try {
        let perPage = 10
        let page = parseInt(data.count)
        
        if (!data.category) {
            const result = await getDB().collection(laptopCollectionName).aggregate([
                {
                    $match: {
                        nameProduct: { $regex: new RegExp(`${data.nameProduct}`) },
                        _destroy: false
                    }
                }
            ]).skip((perPage * page) - perPage).limit(perPage).toArray()
            const resultTotal = await getDB().collection(laptopCollectionName).aggregate([
                {
                    $match: {
                        nameProduct: { $regex: new RegExp(`${data.nameProduct}`) },
                        _destroy: false
                    }
                }
            ]).toArray()
            console.log({ data: [...result], total: resultTotal.length })
            return { data: [...result], total: resultTotal.length }
        } else {
            let newCategory = data.category.filter(category => category !== 'Chọn loại' && category !== 'Chọn loại CPU' && category !== 'Chọn mức giá')

            let newData
            if (newCategory[0] === 'Chọn danh mục') {
                newData = { ...data, category: [] }
            } else {
                newData = { ...data, category: newCategory }
            }
            if (newData.category.length > 0) {
                const result = await getDB().collection(laptopCollectionName).aggregate([
                    {
                        $match: {
                            nameProduct: { $regex: new RegExp(`${newData.nameProduct}`) },
                            category: { $all: newData.category },
                            _destroy: false
                        }
                    }
                ]).skip((perPage * page) - perPage).limit(perPage).toArray()
                const resultTotal = await getDB().collection(laptopCollectionName).aggregate([
                    {
                        $match: {
                            nameProduct: { $regex: new RegExp(`${newData.nameProduct}`) },
                            category: { $all: newData.category },
                            _destroy: false
                        }
                    }
                ]).toArray()
                return { data: [...result], total: resultTotal.length }
            }
            else {
                const result = await getDB().collection(laptopCollectionName).aggregate([
                    {
                        $match: {
                            nameProduct: { $regex: new RegExp(`${newData.nameProduct}`) },
                            _destroy: false
                        }
                    }
                ]).skip((perPage * page) - perPage).limit(perPage).toArray()
                const resultTotal = await getDB().collection(laptopCollectionName).aggregate([
                    {
                        $match: {
                            nameProduct: { $regex: new RegExp(`${newData.nameProduct}`) },
                            _destroy: false
                        }
                    }
                ]).toArray()
                return { data: [...result], total: resultTotal.length }
            }
        }

    } catch (error) {
        throw new Error(error)
    }
}
export const laptopCollectingModel = { 
    createNew, 
    getFullLaptopInformation, 
    getFullLaptopInformationAdmin, 
    getFullLaptopCollecting, 
    update, 
    findOneById, 
    getSearchLaptopInformation 
}