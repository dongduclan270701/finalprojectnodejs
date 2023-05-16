import Joi from 'joi'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        product: Joi.array().required().items(Joi.object()),
        email: Joi.string().required(),
        username: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        district: Joi.string().required(),
        commune: Joi.string().required(),
        method_payment: Joi.string().required(),
        sumOrder: Joi.number().required(),
        ship: Joi.number().required(),
        discountCode: Joi.array().items(Joi.string()),
        shipping_process: Joi.array().required().items(Joi.object({
            time: Joi.string().required(),
            date: Joi.string().required(),
            content: Joi.string().required()
        })),
        status: Joi.string()
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

export const orderAdminValidation = { createNew, update }