module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'module:react-native-dotenv',
    // Zod 4 ships `export * as ns from` syntax that the RN preset doesn't transform.
    '@babel/plugin-transform-export-namespace-from',
  ],
};
