import { requestService } from '*/services/Customer/request.service'
import { HttpStatusCode } from '*/utils/constants'

const createNewRequestWebsite = async (req, res) => {
    try {
        const result = await requestService.createNewRequestWebsite()
        res.status(HttpStatusCode.CREATED).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const createNewRequestAds = async (req, res) => {
    try {
        const result = await requestService.createNewRequestAds()
        res.status(HttpStatusCode.CREATED).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const requestController = {
    createNewRequestWebsite,
    createNewRequestAds
}