import { orderAdminModel } from '*/models/Admin/orderAdmin.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newOrder = await orderAdminModel.createNew(data)
        const getNewOrder = await orderAdminModel.findOneById(newOrder.insertedId.toString())
        await orderAdminModel.findUserAndUpdateOrderList(data.email, getNewOrder)
        return getNewOrder
    } catch (error) {
        throw new Error(error)
    }
}

const getFullorder = async (data) => {
    try {
        const order = await orderAdminModel.getFullorder(data)
        const transfromUser = cloneDeep(order)
        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchOrder = async (data) => {
    try {
        const order = await orderAdminModel.getSearchOrder(data)

        const transfromUser = cloneDeep(order)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const getFullOrderInformation = async (orderId) => {
    try {
        const user = await orderAdminModel.getFullOrderInformation(orderId)
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
        const updatedUser = await orderAdminModel.update(src, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const orderAdminService = { createNew, getSearchOrder, getFullOrderInformation, getFullorder, update }