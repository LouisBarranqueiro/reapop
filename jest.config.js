module.exports = {
  coverageReporters: ['lcov'],
  coverageDirectory: 'coverage',
  setupFiles: ['./test/test-bundler.js'],
  'moduleNameMapper': {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy'
  }
};
