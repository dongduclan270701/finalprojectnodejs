import { orderModel } from '*/models/order.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newOrder = await orderModel.createNew(data)
        await orderModel.findUserAndUpdateOrderList(data.email, newOrder.insertedId.toString())
        const getNewOrder = await orderModel.findOneById(newOrder.insertedId.toString())
        
        return getNewOrder
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

const getSearchOrder = async (data) => {
    try {
        const order = await orderModel.getSearchOrder(data)

        const transfromUser = cloneDeep(order)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const getFullOrderInformation = async (orderId) => {
    try {
        const user = await orderModel.getFullOrderInformation(orderId)
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

export const orderService = { createNew, getSearchOrder, getFullOrderInformation, getFullorder, update }