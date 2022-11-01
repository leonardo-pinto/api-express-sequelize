export default {
  port: parseInt(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 12,
  jwtSecret: process.env.JWT_SECRET || 'd02c8340e40905f2a2e3e94cdsjk95a54b02e51de79b93938bceea65e1d7280e'
}