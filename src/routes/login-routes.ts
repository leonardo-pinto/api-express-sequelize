import { Router } from 'express'
import LoginController from '../controllers/login-controller'
import { RequestValidator } from '../middlewares'
import { asyncWrapper } from '../utils/async-wrapper'
import { LoginValidation } from '../validations/login/login-validation'
import { RegisterValidation } from '../validations/login/register-validation'

const loginController = new LoginController()

export default (router: Router): void => {
  router.post('/register', RequestValidator.validate(RegisterValidation), asyncWrapper(loginController.register))
  router.post('/login', RequestValidator.validate(LoginValidation), asyncWrapper(loginController.login))
}