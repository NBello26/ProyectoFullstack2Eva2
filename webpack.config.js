const path = require('path');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx'], // para que reconozca .jsx
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
        use: 'babel-loader', // asegurarte de tener babel-loader instalado
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // para importar CSS
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource', // para importar imágenes
      },
    ],
  },
};
