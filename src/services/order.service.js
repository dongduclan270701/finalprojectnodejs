import { orderModel } from '*/models/order.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newUser = await orderModel.createNew(data)
        const getNewCard = await orderModel.findOneById(newUser.insertedId.toString())
        return getNewCard
        // if (newUser.message === 'Email đã tồn tại') {
        //     return newUser
        // }
        // else {
        //     const getNewCard = await orderModel.findOneById(newUser.insertedId.toString())
        //     return getNewCard
        // }
    } catch (error) {
        throw new Error(error)
    }
}

const getFullorder = async (data) => {
    try {
        const order = await orderModel.getFullorder(data)

        const transfromUser = cloneDeep(order)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchLaptopInformation = async (data) => {
    try {
        const order = await orderModel.getSearchLaptopInformation(data)

        const transfromUser = cloneDeep(order)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const getFullLaptopInformation = async (userId) => {
    try {
        const user = await orderModel.getFullLaptopInformation(userId)
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
        const updatedUser = await orderModel.update(src, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const orderService = { createNew, getSearchLaptopInformation, getFullLaptopInformation, getFullorder, update }