import { orderCustomerModel } from '*/models/Customer/orderCustomer.model'
import { cloneDeep } from 'lodash'

const createNew = async (data) => {
    try {
        const newOrder = await orderCustomerModel.createNew(data)
        const getNewOrder = await orderCustomerModel.findOneById(newOrder.insertedId.toString())
        await orderCustomerModel.findUserAndUpdateOrderList(data.email, getNewOrder)
        return getNewOrder
    } catch (error) {
        throw new Error(error)
    }
}

const getFullorder = async (data) => {
    try {
        const order = await orderCustomerModel.getFullorder(data)
        const transfromUser = cloneDeep(order)
        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchOrder = async (data) => {
    try {
        const order = await orderCustomerModel.getSearchOrder(data)

        const transfromUser = cloneDeep(order)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const getFullOrderInformation = async (orderId) => {
    try {
        const user = await orderCustomerModel.getFullOrderInformation(orderId)
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
        const updatedUser = await orderCustomerModel.update(src, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

const ratingOrder = async (id, data) => {
    try {
        const updatedRatingOrder = await orderCustomerModel.ratingOrder(id, data)
        return updatedRatingOrder
    } catch (error) {
        throw new Error(error)
    }
}

export const orderCustomerService = { createNew, getSearchOrder, getFullOrderInformation, getFullorder, update, ratingOrder }