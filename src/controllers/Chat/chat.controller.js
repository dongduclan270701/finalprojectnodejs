import { chatService } from '*/services/Chat/chat.service'
import { HttpStatusCode } from '*/utils/constants'

const update = async (req, res) => {
    try {
        const result = await chatService.update(req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const updateReply = async (req, res) => {
    try {
        const result = await chatService.updateReply(req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const deleteReply = async (req, res) => {
    try {
        const result = await chatService.deleteReply(req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const deleteComment = async (req, res) => {
    try {
        const result = await chatService.deleteComment(req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const chatController = { 
    update,
    updateReply,
    deleteReply,
    deleteComment
}