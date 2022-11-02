import { Router } from 'express'
import LoginController from '../controllers/login-controller'
import { asyncWrapper } from '../utils/async-wrapper'


const authController = new LoginController()

export default (router: Router): void => {
  router.post('/register', asyncWrapper(authController.register))
}