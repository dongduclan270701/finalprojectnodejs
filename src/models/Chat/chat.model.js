import Joi from 'joi'
import { getDB } from '*/config/mongodb.js'
import { ObjectId } from 'mongodb'
import crypto from 'crypto'

const update = async (data) => {
    try {
        const id = crypto.randomBytes(12).toString('hex')
        const newData = { ...data, chat: { ...data.chat, idChat: id } }
        const updateProduct = await getDB().collection(data.collection).findOneAndUpdate(
            { src: data.src },
            { $push: { chat: newData.chat } },
            { returnDocument: 'after' }
        )
        return updateProduct.value
    } catch (error) {
        throw new Error(error)
    }
}

const updateReply = async (data) => {
    try {
        const id = crypto.randomBytes(12).toString('hex')
        const newReply = {...data.reply, idReply: id}
        const updateResult = await getDB().collection(data.product.collection).updateOne(
            { 'chat.idChat': data.idChat },
            { $push: { 'chat.$.reply': newReply } }
        )
        return updateResult
    } catch (error) {
        throw new Error(error)
    }
}

const deleteReply = async (data) => {
    try {
        const updateResult = await getDB().collection(data.product.collection).updateOne(
            {
                'chat.idChat': data.idChat,
                'chat.reply.idReply': data.idReply
            },
            {
                $set: { 'chat.$.reply.$[elem]._destroy': true }
            },
            {
                arrayFilters: [{ 'elem.idReply': data.idReply }]
            }
        )
        return updateResult
    } catch (error) {
        throw new Error(error)
    }
}

const deleteComment = async (data) => {
    try {
        const updateResult = await getDB().collection(data.product.collection).updateOne(
            {
                'chat.idChat': data.idChat
            },
            {
                $set: { 'chat.$._destroy': true }
            }
        )
        return updateResult
    } catch (error) {
        throw new Error(error)
    }
}

export const chatModel = { update, updateReply, deleteReply, deleteComment }