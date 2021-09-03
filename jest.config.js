module.exports = {
    coverageReporters: ['text', 'lcov'],
    collectCoverageFrom: ['src/**/*.ts(x)?'],
    coverageDirectory: 'tests_coverage',
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    setupFiles: ['./src/setup-tests.ts'],
    modulePaths: ['<rootDir>/'],
    testEnvironment: 'jsdom',
}
