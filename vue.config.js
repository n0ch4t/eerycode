module.exports = {
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://www.eerycode.com:4002',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
};
