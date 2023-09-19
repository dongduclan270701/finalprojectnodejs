import { laptopCollectingCustomerModel } from '*/models/Customer/laptopCollectingCustomer.model'
import { cloneDeep } from 'lodash'

const getFullLaptopInformation = async (id, data) => {
    try {
        const user = await laptopCollectingCustomerModel.getFullLaptopInformation(id, data)
        const transformUser = cloneDeep(user)
        return transformUser
    } catch (error) {
        throw new Error(error)
    }
}

const getBestLaptop = async () => {
    try {
        const user = await laptopCollectingCustomerModel.getBestLaptop()
        const transformUser = cloneDeep(user)
        return transformUser
    } catch (error) {
        throw new Error(error)
    }
}

export const laptopCollectingCustomerService = {
    getFullLaptopInformation,
    getBestLaptop
}