const plugins = [
  [
    'module-resolver',
    {
      root: ['./src'],
      extensions: [
        '.ios.js',
        '.android.js',
        '.js',
        'jsx',
        '.ts',
        '.tsx',
        '.json',
      ],
      alias: {
        '@src': './src',
        '@img': './assets/image',
      },
    },
  ],
  [{ globals: ['__scanCodes'], relativeSourceLocation: true }],
];

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  sourceMaps: true,
  plugins,
};
