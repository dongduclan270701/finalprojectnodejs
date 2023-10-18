import { userService } from '*/services/Customer/user.service'
import { HttpStatusCode } from '*/utils/constants'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createNew = async (req, res) => {
    try {
        const data = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const newData = { ...data, password: hashedPassword }
        const result = await userService.createNew(newData)
        if (result.message === 'Email đã tồn tại') {
            res.status(HttpStatusCode.OK).json('Email already exists')
        }
        else {
            const token = jwt.sign({ _id: result._id, role: 'Customer', email: result.email }, process.env.TOKEN_SECRET_CUSTOMER)
            // res.header('auth-token', token).send(token)
            res.status(HttpStatusCode.OK).json({ token: token, user: [result.email, result.username, result.phoneNumber, result.address, result.image] })
            // res.status(HttpStatusCode.OK).json(result)
        }
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullUser = async (req, res) => {

    try {
        const { email, password } = req.params
        const result = await userService.getFullUser(email)
        if (result.message === 'Not found user') {
            res.status(HttpStatusCode.OK).json('Email does not exist')
        } else {
            const validPassword = await bcrypt.compare(password, result.password)
            if (!validPassword) {
                res.status(HttpStatusCode.OK).json('incorrect password')
            } else {
                const token = jwt.sign({ _id: result._id, role: 'Customer', email: result.email }, process.env.TOKEN_SECRET_CUSTOMER)
                // res.header('auth-token', token).send(token)
                res.status(HttpStatusCode.OK).json({ token: token, user: [result.email, result.username, result.phoneNumber, result.address, result.image] })
            }
        }
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getFullUserInformation = async (req, res) => {
    try {
        const { id } = req.params
        const result = await userService.getFullUser(id)
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
        const result = await userService.update(id, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const updatePassword = async (req, res) => {
    try {
        const { id } = req.params
        const validPassword = await bcrypt.compare(req.body.oldPassword, req.body.password)
        if (!validPassword) {
            res.status(HttpStatusCode.OK).json('Password incorrect')
        } else {

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)
            const newData = { ...req.body, password: hashedPassword }
            const { oldPassword, newPassword, ...newUpdateData } = newData
            const result = await userService.update(id, newUpdateData)
            res.status(HttpStatusCode.OK).json(result)
        }
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const userController = { createNew, getFullUserInformation, getFullUser, update, updatePassword }