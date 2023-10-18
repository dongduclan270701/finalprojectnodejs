import Joi from 'joi'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        product: Joi.object().required(),
        email: Joi.string().required(),
        time: Joi.string().required(),
        date: Joi.string().required(),
        content: Joi.string().required(),
        status: Joi.string().required(),
        orderId: Joi.string(),
        createDate: Joi.string()
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message
        })
    }
}

const updateOrder = async (req, res, next) => {
    const condition = Joi.object({
    })
    try {
        await condition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
        next()
    } catch (error) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
            error: new Error(error).message
        })
    }
}

export const noticeValidation = { createNew, updateOrder }