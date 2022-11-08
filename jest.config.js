module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/tests/**',
    '!<rootDir>/src/server.ts',
    '!<rootDir>/src/database/**',
    '!<rootDir>/src/config/environment.ts'
  ],
};