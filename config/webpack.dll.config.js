const path = require('path');

const dllPath = path.join(__dirname, 'dll')

module.exports = { 
  context: process.cwd(),
  entry: {
    ReactStuff: [
     'react', 
     'react-dom', 
     'react-router',
     'react-apollo'
    ],
    Apollo: [
      'graphql',
      'apollo-boost',
      'apollo-link-context',
    ]
  }, 
 
 output: {
    filename: '[name].dll.js',
    path: dllPath, 
    library: '[name]', 
  }, 
  
  plugins: [ 
    new webpack.DllPlugin({ 
      name: '[name]',
      path: join(outputPath, '[name].json')
    })
  ]
};