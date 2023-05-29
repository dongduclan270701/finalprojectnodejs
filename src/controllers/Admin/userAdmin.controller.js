import { userAdminService } from '*/services/Admin/userAdmin.service'
import { HttpStatusCode } from '*/utils/constants'

const getFullUser = async (req, res) => {

    try {
        const data = req.query
        const result = await userAdminService.getFullUser(data)
        res.status(HttpStatusCode.OK).json(result)

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullOrderInformation = async (req, res) => {
    try {
        const { id } = req.params
        const result = await userAdminService.getFullOrderInformation(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchOrder = async (req, res) => {
    try {
        const data = req.query
        const result = await userAdminService.getSearchOrder(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const result = await userAdminService.update(id, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const userAdminController = { 
    getFullUser,
}