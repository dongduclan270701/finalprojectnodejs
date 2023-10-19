import { noticeService } from '*/services/Customer/notice.service'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res) => {
    try {
        const data = req.body
        const result = await noticeService.createNew(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullNotice = async (req, res) => {
    try {
        const data = req.params
        const result = await noticeService.getFullNotice(data)
        res.status(HttpStatusCode.OK).json(result)

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getUpdateNotice = async (req, res) => {
    try {
        const result = await noticeService.getUpdateNotice(req.params, req.body)
        res.status(HttpStatusCode.OK).json(result)

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const noticeController = { 
    createNew,
    getFullNotice,
    getUpdateNotice
}