import Database from './database'
import dbConfig from './config/database'
import env from './config/environment'

(async () => {
  try {
    const db = new Database(env.nodeEnv, dbConfig)
    await db.connect()
    const app = (await import('./app')).default
    app.listen(env.port, () => console.log(`Server running at port ${env.port}`))
  } catch (error) {
    console.log(`Something went wrong when initializing the server: ${error.message}`)
  }
})()