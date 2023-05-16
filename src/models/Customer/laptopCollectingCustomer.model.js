import { getDB } from '*/config/mongodb.js'

const laptopCollectionName = 'laptop'

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

export const laptopCollectingCustomerModel = { 
    getFullLaptopInformation
}