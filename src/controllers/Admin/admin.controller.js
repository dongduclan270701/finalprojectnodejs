import { adminService } from '*/services/Admin/admin.service'
import { HttpStatusCode } from '*/utils/constants'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const createNewEmployee = async (req, res) => {
    try {
        const data = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(data.password, salt)
        const newData = { ...data, password: hashedPassword }
        const result = await adminService.createNewEmployee(newData)
        if (result.message === 'Email đã tồn tại') {
            res.status(HttpStatusCode.OK).json('Email đã tồn tại')
        }
        else {
            const token = jwt.sign({ _id: result._id, role: result.role }, process.env.TOKEN_SECRET_ADMIN)
            // res.status(HttpStatusCode.OK).json({ token: token, username: result.username })
            res.status(HttpStatusCode.OK).json(token)
        }
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const loginEmployee = async (req, res) => {
    try {
        const { email, password } = req.params
        const result = await adminService.loginEmployee(email)
        if (result.message === 'Not found employee') {
            res.status(HttpStatusCode.OK).json('Email does not exist')
        } else {
            const validPassword = await bcrypt.compare(password, result.password)
            if (!validPassword) {
                res.status(HttpStatusCode.OK).json('Incorrect password')
            } else {
                const token = jwt.sign({ _id: result._id, role: result.role }, process.env.TOKEN_SECRET_ADMIN)
                res.status(HttpStatusCode.OK).json({ token: token, username: result.username })
            }
        }
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getInformationEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const result = await adminService.getInformationEmployee(id)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params
        const result = await adminService.updateEmployee(id, req.body)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

const getAllEmployee = async (req, res) => {
    try {
        const data = req.query
        const result = await adminService.getAllEmployee(data)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

export const adminController = { 
    getAllEmployee,
    createNewEmployee, 
    getInformationEmployee, 
    loginEmployee, 
    updateEmployee 
}