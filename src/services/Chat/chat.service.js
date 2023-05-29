import { chatModel } from '*/models/Chat/chat.model'

const update = async (data) => {
    try {
        const updatedChat = await chatModel.update(data)
        return updatedChat
    } catch (error) {
        throw new Error(error)
    }
}

const updateReply = async (data) => {
    try {
        const updatedChat = await chatModel.updateReply(data)
        return updatedChat
    } catch (error) {
        throw new Error(error)
    }
}

const deleteReply = async (data) => {
    try {
        const deleteReply = await chatModel.deleteReply(data)
        return deleteReply
    } catch (error) {
        throw new Error(error)
    }
}

const deleteComment = async (data) => {
    try {
        const deleteComment = await chatModel.deleteComment(data)
        return deleteComment
    } catch (error) {
        throw new Error(error)
    }
}

export const chatService = { update, updateReply, deleteReply, deleteComment }