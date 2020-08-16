module.exports = {
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:4002',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
};
