import Database from '../../src/database'
import dbConfig from '../../src/config/database'
import request from 'supertest'
import User from '../../src/models/user'
import Book from '../../src/models/book'

let db: Database

export default class TestsHelper {

  static async startDb() {
    db = new Database('test', dbConfig)
    await db.connect()
    return db
  }

  static async stopDb() {
    await db.disconnect()
  }

  static async syncDb() {
    await db.sync()
  }

  static async getApp() {
    const app = require('../../src/app').default
    return app
  }

  static async createNewUser(role?: string) {
    return User.create({
      email: 'valid_email@example.com',
      password: 'valid_password',
      firstName: 'John',
      lastName: 'Doe',
      role: role ?? 'admin'
    })
  }

  static async createNewUserRequest(role?: string) {
    const app = await TestsHelper.getApp()
    return request(app)
      .post('/api/v1/register')
      .send({
        email: 'valid_email@example.com',
        password: 'valid_password',
        firstName: 'Leonardo',
        lastName: 'Pinto',
        role: role ?? 'admin'
      })
  }

  static async loginRequest(email?: string, password?: string) {
    const app = await TestsHelper.getApp()
    return request(app)
      .post('/api/v1/login')
      .send({
        email: email ?? 'valid_email@example.com',
        password: password ?? 'valid_password'
      })
  }

  static async createNewBookRequest(accessToken: string) {
    const app = await TestsHelper.getApp()
    return request(app)
      .post('/api/v1/book')
      .set('authorization', `Bearer ${accessToken}`)
      .send({
        title: 'any_title',
        subject: 'any_subject',
        author: 'any_author',
        publisher: 'any_publisher'
      })
  }

  static async createNewBook() {
    return Book.create({
      title: 'any_title',
      subject: 'any_subject',
      author: 'any_author',
      publisher: 'any_publisher'
    })
  }

  static async createNewRentRequest(accessToken: string) {
    const app = await TestsHelper.getApp()
    return request(app)
      .post('/api/v1/rental')
      .set('authorization', `Bearer ${accessToken}`)
      .send({
        bookId: '1'
      })
  }

  static async renewRequest(accessToken: string, id?: string) {
    const rentalId = id ?? '1'
    const app = await TestsHelper.getApp()
    return request(app)
      .put(`/api/v1/rental/${rentalId}/renew`)
      .set('authorization', `Bearer ${accessToken}`)
  }

  static async deleteBookRequest(bookId: string, accessToken: string) {
    const app = await TestsHelper.getApp()
    return request(app).delete(`/api/v1/book/${bookId}`)
      .set('authorization', `Bearer ${accessToken}`)
  }

  static async getAllBooksRequest(accessToken: string) {
    const app = await TestsHelper.getApp()
    return request(app).get('/api/v1/book')
    .set('authorization', `Bearer ${accessToken}`)
    .expect(200)
  }

  static async returnRentalRequest(accessToken: string) {
    const app = await TestsHelper.getApp()
    return request(app)
      .put(`/api/v1/rental/1/return`)
      .set('authorization', `Bearer ${accessToken}`)
  }
}
