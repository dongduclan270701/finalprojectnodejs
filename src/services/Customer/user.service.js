import { UserModel } from '*/models/Customer/user.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newUser = await UserModel.createNew(data)
        if (newUser.message === 'Email đã tồn tại') {
            return newUser
        }
        else {
            const getNewCard = await UserModel.findOneById(newUser.insertedId.toString())
            return getNewCard
        }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullUser = async (email) => {
    try {
        const user = await UserModel.getFullUser(email)
        if (!user) {
            throw new Error('not Found')
        }

        const transfromUser = cloneDeep(user)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const getFullUserInformation = async (userId) => {
    try {
        const user = await UserModel.getFullUserInformation(userId)
        if (!user) {
            throw new Error('not Found')
        }

        const transfromUser = cloneDeep(user)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now()
        }
        const updatedUser = await UserModel.update(id, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const userService = { createNew, getFullUserInformation, getFullUser, update }