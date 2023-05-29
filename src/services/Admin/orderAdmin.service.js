import { orderAdminModel } from '*/models/Admin/orderAdmin.model'
import { cloneDeep } from 'lodash'

const getFullOrder = async (data) => {
    try {
        const order = await orderAdminModel.getFullOrder(data)
        const transformOrder = cloneDeep(order)
        return transformOrder
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchOrder = async (data) => {
    try {
        const order = await orderAdminModel.getSearchOrder(data)
        const transformOrder = cloneDeep(order)
        return transformOrder
    } catch (error) {
        throw new Error(error)
    }
}

const getFullOrderInformation = async (orderId) => {
    try {
        const order = await orderAdminModel.getFullOrderInformation(orderId)
        if (!order) {
            throw new Error('not Found')
        }
        const transformOrder = cloneDeep(order)
        return transformOrder
    } catch (error) {
        throw new Error(error)
    }
}

const updateOrder = async (src, data) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now()
        }
        const updatedOrder = await orderAdminModel.update(src, updateData)
        return updatedOrder
    } catch (error) {
        throw new Error(error)
    }
}

const ratingOrder = async (id, data) => {
    try {
        const updatedRatingOrder = await orderAdminModel.ratingOrder(id, data)
        return updatedRatingOrder
    } catch (error) {
        throw new Error(error)
    }
}

export const orderAdminService = { 
    getSearchOrder, 
    getFullOrderInformation, 
    getFullOrder, 
    updateOrder,
    ratingOrder
}