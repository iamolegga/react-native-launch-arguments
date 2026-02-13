/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: "..",
  maxWorkers: 1,
  testTimeout: 1800000,
  testMatch: ["<rootDir>/e2e/**/*.e2e.js"],
  reporters: ["detox/runners/jest/reporter"],
  globalSetup: "detox/runners/jest/globalSetup",
  globalTeardown: "detox/runners/jest/globalTeardown",
  testEnvironment: "detox/runners/jest/testEnvironment",
  verbose: true,
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!react-native)"],
};
