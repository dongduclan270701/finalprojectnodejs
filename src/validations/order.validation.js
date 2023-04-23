import Joi from 'joi'
import { HttpStatusCode } from '*/utils/constants'

const createNew = async (req, res, next) => {
    const condition = Joi.object({
        product: Joi.array().required().items(Joi.object()),
        username: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        district: Joi.string().required(),
        commune: Joi.string().required(),
        discountCode: Joi.string().allow('')
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

export const orderValidation = { createNew, update }