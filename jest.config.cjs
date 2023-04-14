module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  };