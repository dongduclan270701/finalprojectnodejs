import { syncUserService } from '*/services/Customer/syncUser.service'
import { HttpStatusCode } from '*/utils/constants'

const syncUser = async (req, res) => {
    try {
        const result = await syncUserService.syncUser(req.result)
        res.status(HttpStatusCode.OK).json(result)
    } catch (error) {
        res.status(HttpStatusCode.INTERNAL_SERVER).json({
            error: error.message
        })
    }
}


export const syncUserController = { syncUser }