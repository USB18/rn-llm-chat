module.exports = {
  preset: '@react-native/jest-preset',
  // react-native-markdown-display ships untranspiled ES modules, so Jest must transform it too.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-markdown-display)/)',
  ],
};
