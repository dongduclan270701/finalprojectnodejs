import Joi from 'joi'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        img: Joi.array().items(Joi.string()).required(),
        src: Joi.string().required(),
        percent: Joi.number().min(0).max(100).required(),
        gift: Joi.array().items(Joi.string()).required(),
        gift_buy: Joi.array().items(Joi.string()).required(),
        quantity: Joi.number().integer().min(0).required(),
        nameProduct: Joi.string().required().required(),
        realPrice: Joi.number().min(0).required(),
        nowPrice: Joi.number().min(0).required(),
        description_table: Joi.array().required().items(Joi.array().ordered(Joi.string(), Joi.string())),
        description: Joi.array().required().items(Joi.array().ordered(Joi.string(), Joi.string())),
        category: Joi.array().required().items(Joi.string())
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

const update = async (req, res, next) => {
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

export const laptopCollectingValidation = { createNew, update }