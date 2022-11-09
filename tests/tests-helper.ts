import Database from '../src/database'
import dbConfig from '../src/config/database'
import request from 'supertest'

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
    const app = require('../src/app').default
    return app
  }

  static async createNewUser(role?: string) {
    const app = await TestsHelper.getApp()
    return request(app)
      .post('/api/v1/register')
      .send({
        email: 'test@example.com',
        password: 'any_password',
        firstName: 'Leonardo',
        lastName: 'Pinto',
        role: role ?? 'admin'
      })
  }

  static async createNewBook(accessToken: string) {
    const app = await TestsHelper.getApp()
    return request(app)
      .post('/api/v1/book')
      .set('authorization', accessToken)
      .send({
        title: 'any_title',
        subject: 'any_subject',
        author: 'any_author',
        publisher: 'any_publisher'
      })
  }
}
