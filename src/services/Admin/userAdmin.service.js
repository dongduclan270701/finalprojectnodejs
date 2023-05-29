import { userAdminModel } from '*/models/Admin/userAdmin.model'
import { cloneDeep } from 'lodash'


const getFullUser = async (data) => {
    try {
        const user = await userAdminModel.getFullUser(data)
        const transformUser = cloneDeep(user)
        return transformUser
    } catch (error) {
        throw new Error(error)
    }
}

const getSearchOrder = async (data) => {
    try {
        const order = await userAdminModel.getSearchOrder(data)

        const transfromUser = cloneDeep(order)

        return transfromUser
    } catch (error) {
        throw new Error(error)
    }
}

const getFullOrderInformation = async (orderId) => {
    try {
        const user = await userAdminModel.getFullOrderInformation(orderId)
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
        const updatedUser = await userAdminModel.update(src, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

export const userAdminService = { getFullUser }