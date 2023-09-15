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
            res.status(HttpStatusCode.OK).json('Email đã tồn tại')
        }
        else {
            const token = jwt.sign({ _id: result._id, role: 'Customer', email: result.email, username: result.username }, process.env.TOKEN_SECRET_CUSTOMER)
            // res.header('auth-token', token).send(token)
            res.status(HttpStatusCode.OK).json({ token: token, user: [result.email, result.username, result.phoneNumber, result.address] })
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
            res.status(HttpStatusCode.OK).json('Email không tồn tại')
        } else {
            const validPassword = await bcrypt.compare(password, result.password)
            if (!validPassword) {
                res.status(HttpStatusCode.OK).json('Mật khẩu không chính xác')
            } else {
                const token = jwt.sign({ _id: result._id, role: 'Customer', email: result.email, username: result.username }, process.env.TOKEN_SECRET_CUSTOMER)
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
        const { email } = req.params
        const result = await userService.getFullUser(email)
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

export const userController = { createNew, getFullUserInformation, getFullUser, update }