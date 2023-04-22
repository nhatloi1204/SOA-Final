const path = require('path');

module.exports = {
    entry: './src/public/javascript/script.js',
    output: {
        path: path.join(__dirname, '/src/public/javascript'),
        filename: 'bundle.js',
    },
    watch: true,
};
