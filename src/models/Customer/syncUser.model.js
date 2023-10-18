import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'

const syncUser = async (data) => {
    try {
        const result = await getDB().collection('users').aggregate([
            {
                $match: {
                    email: data.email,
                    _destroy: false
                }
            }
        ]).toArray()
        return result[0]
    } catch (error) {
        throw new Error(error)
    }
}

export const syncUserModel = { syncUser }