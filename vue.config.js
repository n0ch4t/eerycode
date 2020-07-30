module.exports = {
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://eerycode.com:4002',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
};
