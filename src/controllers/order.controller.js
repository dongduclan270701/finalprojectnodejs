import { orderService } from '*/services/order.service'
import { HttpStatusCode } from '*/utils/constants'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createNew = async (req, res) => {
    try {
        const data = req.body
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(data.password, salt)
        // const newData = { ...data, password: hashedPassword }
        const result = await orderService.createNew(data)
        // if (result.message === 'Email đã tồn tại') {
        //     res.status(HttpStatusCode.OK).json('Email đã tồn tại')
        // }
        // else {
        // const token = jwt.sign({ _id: result._id }, process.env.TOKEN_SECRET)
        // res.header('auth-token', token).send(token)
        // res.status(HttpStatusCode.OK).json({ token: token, username: result.username })
        res.status(HttpStatusCode.OK).json(result)
        // }
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullorder = async (req, res) => {

    try {
        const data = req.query
        const result = await orderService.getFullorder(data)
        
        res.status(HttpStatusCode.OK).json(result)

    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullLaptopInformation = async (req, res) => {
    try {
        const { id } = req.params
        const result = await orderService.getFullLaptopInformation(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getSearchLaptopInformation = async (req, res) => {
    try {
        const data = req.query
        const result = await orderService.getSearchLaptopInformation(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const update = async (req, res) => {
    try {
        const { src } = req.params
        const result = await orderService.update(src, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const orderController = { createNew, getSearchLaptopInformation, getFullLaptopInformation, getFullorder, update }