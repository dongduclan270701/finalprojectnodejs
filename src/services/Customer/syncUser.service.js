import { syncUserModel } from '*/models/Customer/syncUser.model'

const syncUser = async (data) => {
    try {
        const newUser = await syncUserModel.syncUser(data)
        return newUser
    } catch (error) {
        throw new Error(error)
    }
}

export const syncUserService = { syncUser }