module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: __dirname,
  testRegex: 'spec.ts$',
  setupFiles: [`${__dirname}/jest.setup.ts`],
  testTimeout: 999999,
  globals: {
    'ts-jest': {
      tsConfig: `${__dirname}/tsconfig.json`,
    },
  },
};
