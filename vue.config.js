module.exports = {
    devServer: {
        proxy: {
            // proxy 설정 api
            '/v1/*': {
                target: 'http://www.eerycode.com:4002',
            },
        },
    },
};
