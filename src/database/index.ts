import cls from 'cls-hooked'
import { Sequelize } from 'sequelize'

export default class Database {

  private environment: string
  private dbConfig: DbConfig
  private isTestEnvironment: boolean
  private connection: Sequelize

  constructor(environment: string, dbConfig: DbConfig) {
    this.environment = environment
    this.dbConfig = dbConfig
    this.isTestEnvironment = this.environment === 'test'
  }

  async connect() {
    const namespace = cls.createNamespace('transactions-namespace')
    Sequelize.useCLS(namespace)

    const {
      username,
      password,
      host,
      port,
      database,
      dialect,
    } = this.dbConfig[this.environment]

    this.connection = new Sequelize({
      username,
      password,
      host,
      port,
      database,
      dialect,
      logging: this.isTestEnvironment ? false : console.log
    })

    await this.connection.authenticate({ logging: false })

    if (!this.isTestEnvironment) {
      console.log('Connection to the database has been established successfully')
    }

    await this.sync()
  }

  async sync() {
    await this.connection.sync({
      logging: false,
      force: this.isTestEnvironment
    })

    if (!this.isTestEnvironment) {
      console.log('Connection synced successfully')
    }
  }

  async disconnect() {
    await this.connection.close()
  }
}

interface DbConfig {
  development: DbConfigEnv,
  test: DbConfigEnv
}

interface DbConfigEnv {
  username: string
    password: string
    host: string
    port: number
    database: string
    dialect: string
}