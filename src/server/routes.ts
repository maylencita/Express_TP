import * as express from 'express'
import { index } from './templates'
import * as Api from './controllers/ApiController'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send(index)
})
router.get('/ping', Api.ping)
router.get('/channels', Api.getChannels)
router.put('/user', Api.addUser)
router.put('/createChannel', Api.createChannel)

router.get('/channels', Api.getChannels)

router.put('/user', Api.registerUser)

export default router