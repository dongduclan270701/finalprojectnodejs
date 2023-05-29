import { AdminModel } from '*/models/Admin/admin.model'
import { cloneDeep } from 'lodash'

const createNewEmployee = async (data) => {
    try {
        const newEmployee = await AdminModel.createNewEmployee(data)
        if (newEmployee.message === 'Email đã tồn tại') {
            return newEmployee
        }
        else {
            const getNewEmployee = await AdminModel.findOneById(newEmployee.insertedId.toString())
            return getNewEmployee
        }
    } catch (error) {
        throw new Error(error)
    }
}

const loginEmployee = async (email) => {
    try {
        const employee = await AdminModel.loginEmployee(email)
        if (!employee) {
            throw new Error('not Found')
        }
        const transformEmployee = cloneDeep(employee)
        return transformEmployee
    } catch (error) {
        throw new Error(error)
    }
}

const getInformationEmployee = async (employeeId) => {
    try {
        const employee = await AdminModel.getInformationEmployee(employeeId)
        if (!employee) {
            throw new Error('not Found')
        }
        const transformEmployee = cloneDeep(employee)
        return transformEmployee
    } catch (error) {
        throw new Error(error)
    }
}

const updateEmployee = async (id, data) => {
    try {
        const updateData = {
            ...data,
            updateAt: Date.now()
        }
        const updatedUser = await AdminModel.updateEmployee(id, updateData)
        return updatedUser
    } catch (error) {
        throw new Error(error)
    }
}

const getAllEmployee = async (data) => {
    try {
        const listOfEmployee = await AdminModel.getAllEmployee(data)
        const transformEmployee = cloneDeep(listOfEmployee)
        return transformEmployee
    } catch (error) {
        throw new Error(error)
    }
}
export const adminService = { 
    getAllEmployee,
    createNewEmployee, 
    getInformationEmployee, 
    loginEmployee, 
    updateEmployee 
}