import { cartCustomerModel } from '*/models/Customer/cartCustomer.model'
import { cloneDeep } from 'lodash'


const getFullCart = async (data) => {
    try {
        const cart = await cartCustomerModel.getFullCart(data)
        const transformCart = cloneDeep(cart)
        return transformCart
    } catch (error) {
        throw new Error(error)
    }
}

const getFullCartInformation = async (orderId) => {
    try {
        const cart = await cartCustomerModel.getFullCartInformation(orderId)
        if (!cart) {
            throw new Error('not Found')
        }
        const transformCart = cloneDeep(cart)
        return transformCart
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (src, data) => {
    try {
        const updatedCart = await cartCustomerModel.update(src, data)
        return updatedCart
    } catch (error) {
        throw new Error(error)
    }
}

export const cartCustomerService = { getFullCartInformation, getFullCart, update }