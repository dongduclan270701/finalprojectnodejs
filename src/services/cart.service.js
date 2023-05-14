import { cartModel } from '*/models/cart.model'
import { cloneDeep } from 'lodash'


const getFullCart = async (data) => {
    try {
        const cart = await cartModel.getFullCart(data)
        const transformCart = cloneDeep(cart)
        return transformCart
    } catch (error) {
        throw new Error(error)
    }
}

const getFullCartInformation = async (orderId) => {
    try {
        const cart = await cartModel.getFullCartInformation(orderId)
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
        const updatedCart = await cartModel.update(src, data)
        return updatedCart
    } catch (error) {
        throw new Error(error)
    }
}

export const cartService = { getFullCartInformation, getFullCart, update }