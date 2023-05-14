import { collectingService } from '*/services/collecting.service'
import { HttpStatusCode } from '*/utils/constants'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// const createNew = async (req, res) => {
//     try {
//         const data = req.body
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(data.password, salt)
//         const newData = { ...data, password: hashedPassword }
//         const result = await userService.createNew(newData)
//         if (result.message === 'Email đã tồn tại') {
//             res.status(HttpStatusCode.OK).json('Email đã tồn tại')
//         }
//         else {
//             const token = jwt.sign({ _id: result._id }, process.env.TOKEN_SECRET)
//             // res.header('auth-token', token).send(token)
//             res.status(HttpStatusCode.OK).json({ token: token, username: result.username })
//             // res.status(HttpStatusCode.OK).json(result)
//         }
//     } catch (error) {
//         res.status(HttpStatusCode.INTERNAL_SERVER).json({
//             error: error.message
//         })
//     }
// }

// const getFullUser = async (req, res) => {

//     try {
//         const { email, password } = req.params
//         const result = await userService.getFullUser(email)
//         if (result.message === 'Not found user') {
//             res.status(HttpStatusCode.OK).json('Email không tồn tại')
//         } else {
//             const validPassword = await bcrypt.compare(password, result.password)
//             if (!validPassword) {
//                 res.status(HttpStatusCode.OK).json('Mật khẩu không chính xác')
//             } else {
//                 const token = jwt.sign({ _id: result._id }, process.env.TOKEN_SECRET)
//                 // res.header('auth-token', token).send(token)
//                 res.status(HttpStatusCode.OK).json({ token: token, username: result.username })
//             }
//         }
//         //Create and assign a token
//         // console.log(validPassword)
//         // res.status(HttpStatusCode.OK).json(result)

//     } catch (error) {
//         res.status(HttpStatusCode.INTERNAL_SERVER).json({
//             error: error.message
//         })
//     }
// }

const getCollectingByName = async (req, res) => {
    try {
        const { name } = req.params
        const result = await collectingService.getCollectingByName(name)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}
const getFullCollection = async (req, res) => {
    try {
        const result = await collectingService.getFullCollection()
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}

// const update = async (req, res) => {
//     try {
//         const { id } = req.params
//         const result = await userService.update(id, req.body)
//         res.status(HttpStatusCode.OK).json(result)
//     } catch (error) {
//         res.status(HttpStatusCode.INTERNAL_SERVER).json({
//             error: error.message
//         })
//     }
// }

export const collectingController = { 
    getFullCollection,
    getCollectingByName
    // getFullUser, 
    // update 
}