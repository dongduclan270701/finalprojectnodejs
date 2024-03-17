import { RequestModel } from '*/models/Customer/request.model'
import { cloneDeep } from 'lodash'

const createNewRequestWebsite = async (data) => {
    try {
        const newAccountIP = await RequestModel.createNewRequestWebsite(data)
        const getNewAccountIP = await RequestModel.findOneByIdRequestWebsite(newAccountIP.insertedId.toString())
        return getNewAccountIP

    } catch (error) {
        throw new Error(error)
    }
}

const createNewRequestAds = async (data) => {
    try {
        const newAccountIP = await RequestModel.createNewRequestAds(data)
        const getNewAccountIP = await RequestModel.findOneByIdRequestAds(newAccountIP.insertedId.toString())
        return getNewAccountIP

    } catch (error) {
        throw new Error(error)
    }
}

export const requestService = {
    createNewRequestWebsite,
    createNewRequestAds
}