import { collectingCustomerModel } from '*/models/Customer/collectingCustomer.model'
import { cloneDeep } from 'lodash'

const getCollectingByName = async (userId) => {
    try {
        const collection = await collectingCustomerModel.getCollectingByName(userId)
        if (!collection) {
            throw new Error('not Found')
        }
        const transformCollection = cloneDeep(collection)
        return transformCollection
    } catch (error) {
        throw new Error(error)
    }
}
const getFullCollection = async () => {
    try {
        const collection = await collectingCustomerModel.getFullCollection()
        const transformCollection = cloneDeep(collection)
        return transformCollection
    } catch (error) {
        throw new Error(error)
    }
}

export const collectingCustomerService = { 
    getFullCollection,
    getCollectingByName
}