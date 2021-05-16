module.exports = {
    publicPath: '/',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/_api': {
                target: 'http://localhost:8000/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/_api': ''
                }
            },
            '/ws': {
                target: 'ws://localhost:8000/',
                ws: true,
                changeOrigin: true,

            }


    }}, configureWebpack: config => {
        config.externals = {
            "vue": "Vue",
            "vue-router": "VueRouter",
            "axios": "axios",
            "highlight.js": "hljs",
            "qrcodejs2": "QRCode",
            'ant-design-vue': 'antd',
            'moment': 'moment',
            'crypto-js': 'CryptoJS',
            'protobufjs': 'protobuf'
        }
    }
}