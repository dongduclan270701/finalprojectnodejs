import { laptopCollectingCustomerModel } from '*/models/Customer/laptopCollectingCustomer.model'
import { cloneDeep } from 'lodash'

const getFullLaptopInformation = async (userId) => {
    try {
        const user = await laptopCollectingCustomerModel.getFullLaptopInformation(userId)
        if (!user) {
            throw new Error('not Found')
        }

        const transformUser = cloneDeep(user)

        return transformUser
    } catch (error) {
        throw new Error(error)
    }
}

export const laptopCollectingCustomerService = { getFullLaptopInformation }