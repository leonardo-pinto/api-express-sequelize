import { Router } from 'express'
import LoginController from '../controllers/login-controller'
import RequestValidator from '../middlewares/request-validator'
import { asyncWrapper } from '../utils/async-wrapper'
import { LoginValidation } from '../validations/login-validation'
import { RegisterValidation } from '../validations/register-validation'


const authController = new LoginController()

export default (router: Router): void => {
  router.post('/register', RequestValidator.validate(RegisterValidation),asyncWrapper(authController.register))
  router.post('/login', RequestValidator.validate(LoginValidation),asyncWrapper(authController.login))
}