module.exports = {
    baseUrl: '/', // 根路径
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录(js,css,img,fonts)
    lintOnSave: true, //是否开启eslint
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: '8081',
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://videoapi.rogon.top/',
                ws: true,
                changOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
		disableHostCheck: false 
    }
}