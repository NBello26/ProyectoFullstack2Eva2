const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files:
     ['src/tests/**/*.test.js'],
    preprocessors: {
      'src/tests/**/*.test.js': ['webpack', 'sourcemap'],
    },

    webpack: {
      mode: 'development',
      resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
          '@atomos': path.resolve(__dirname, 'src/componentes/atomos'),
          '@organismos': path.resolve(__dirname, 'src/componentes/organismos'),
          '@plantillas': path.resolve(__dirname, 'src/componentes/plantillas'),
          '@paginas': path.resolve(__dirname, 'src/componentes/paginas'),
        },
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader',
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            type: 'asset/resource',
          },
          {
            test: /\.js$/,
            enforce: 'pre',
            use: ['source-map-loader'],
          },
        ],
      },
      devtool: 'inline-source-map',
    },

    webpackMiddleware: {
      stats: 'errors-only',
    },

    reporters: ['progress'],
    browsers: ['ChromeHeadless'],
    singleRun: true,  // <- cambia aquí
    autoWatch: false, // <- y desactiva watch
    concurrency: Infinity,
  });
};
