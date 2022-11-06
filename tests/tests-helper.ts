import Database from '../src/database'
import dbConfig from '../src/config/database'

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

}
