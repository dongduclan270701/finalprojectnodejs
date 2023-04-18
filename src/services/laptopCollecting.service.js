import { laptopCollectingModel } from '*/models/laptopCollecting.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newUser = await laptopCollectingModel.createNew(data)
        console.log(data)
        const getNewCard = await laptopCollectingModel.findOneById(newUser.insertedId.toString())
        return getNewCard
        // if (newUser.message === 'Email đã tồn tại') {
        //     return newUser
        // }
        // else {
        //     const getNewCard = await laptopCollectingModel.findOneById(newUser.insertedId.toString())
        //     return getNewCard
        // }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullUser = async (email) => {
    try {
        const user = await laptopCollectingModel.getFullUser(email)
        if (!user) {
            throw new Error('not Found')
        }

        const transfromUser = cloneDeep(user)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const getFullLaptopInformation = async (userId) => {
    try {
        const user = await laptopCollectingModel.getFullLaptopInformation(userId)
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
        const updatedUser = await laptopCollectingModel.update(id, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const laptopCollectingService = { createNew, getFullLaptopInformation, getFullUser, update }