module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    testMatch: ['<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transform: {
      "^.+\\.css$": "jest-css-modules-transform"
    },
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
};