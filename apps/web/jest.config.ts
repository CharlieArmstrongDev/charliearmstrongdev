module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/tests/e2e/', // Exclude E2E tests (Playwright)
    '<rootDir>/cypress/', // Exclude Cypress tests
  ],
  testMatch: [
    '<rootDir>/tests/unit/**/*.(test|spec).{ts,tsx}', // Only run unit tests
    '<rootDir>/components/**/*.(test|spec).{ts,tsx}', // Component tests
    '<rootDir>/app/**/*.(test|spec).{ts,tsx}', // App tests
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/tests/e2e/**', // Exclude E2E from coverage
  ],
  coverageReporters: ['text', 'lcov'],
};
