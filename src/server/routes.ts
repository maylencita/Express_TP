import * as express from 'express'
import { index } from './templates'
import * as Api from './controllers/ApiController'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send(index)
})
router.get('/ping', Api.ping)

export default router