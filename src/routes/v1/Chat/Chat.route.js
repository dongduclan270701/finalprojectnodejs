import express from 'express'
import { chatController } from '*/controllers/Chat/chat.controller'
import jwt from 'jsonwebtoken'

const authUser = (req, res, next) => {
    const token = req.header('auth-token-user')
    if (!token) {
        return res.status(401).send('Access Denied')
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET_CUSTOMER)
        req.result = verified
        next()
    } catch (error) {
        res.status(500).send('Invalid token')
    }
}

const router = express.Router()

router.route('/')
    .put(authUser, chatController.update)

router.route('/reply')
    .put(authUser, chatController.updateReply)

router.route('/deleteReply')
    .put(authUser, chatController.deleteReply)

router.route('/deleteComment')
    .put(authUser, chatController.deleteComment)

export const chatRoutes = router