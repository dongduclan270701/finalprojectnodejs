import { laptopCollectingModel } from '*/models/laptopCollecting.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newUser = await laptopCollectingModel.createNew(data)
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

const getFullLaptopCollecting = async (data) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getFullLaptopCollecting(data)

        const transfromUser = cloneDeep(laptopCollecting)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchLaptopInformation = async (data) => {
    try {
        const laptopCollecting = await laptopCollectingModel.getSearchLaptopInformation(data)

        const transfromUser = cloneDeep(laptopCollecting)

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

const getFullLaptopInformationAdmin = async (userId) => {
    try {
        const user = await laptopCollectingModel.getFullLaptopInformationAdmin(userId)
        if (!user) {
            throw new Error('not Found')
        }

        const transfromUser = cloneDeep(user)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (src, data) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now()
        }
        const updatedUser = await laptopCollectingModel.update(src, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const laptopCollectingService = { createNew, getSearchLaptopInformation, getFullLaptopInformationAdmin, getFullLaptopInformation, getFullLaptopCollecting, update }