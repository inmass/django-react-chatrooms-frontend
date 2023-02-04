const path = require('path')

module.exports = {
    reactScriptsVersion: "react-scripts",
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@context': path.resolve(__dirname, 'src/context'),
            '@router': path.resolve(__dirname, 'src/router'),
            '@services': path.resolve(__dirname, 'src/services'),
        },
    },
};
