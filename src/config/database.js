module.exports = {
  development: {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'root',
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    database: process.env.MYSQL_DATABASE || 'database_development',
    dialect: 'mysql'
  },
  test: {
    username: process.env.MYSQL_USER_TEST || 'root',
    password: process.env.MYSQL_PASSWORD_TEST || 'root',
    host: process.env.MYSQL_HOST_TEST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT_TEST) || 3307,
    database: process.env.MYSQL_DATABASE_TEST || 'database_test',
    dialect: 'mysql'
  }
}