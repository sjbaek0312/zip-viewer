const path = require('path');
 
const MockWebpackPlugin = require('mock-webpack-plugin');
const mockConfig = require('./mock/config.js');
 
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mock.bundle.js'
  },
 
  plugins: [
    new MockWebpackPlugin({
 
        // mock config content 
        config: mockConfig,
 
        // the prot of the mock server 
        port: 8080
    })
  ],
 
  devServer: {
    // proxy to the mock server 
    proxy: {
        '/api/files': 'http://localhost:8080'
    }
  }
};