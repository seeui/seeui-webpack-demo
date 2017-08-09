/**
 * @file webpack 开发配置
 * @author cgzero(cgzero@cgzero.com)
 */

import fs from 'fs';
import path from 'path';
import Mock from 'mockjs';
import commonConf from './webpack.common.babel';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';

// 获取本地ip地址
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();

    for(var devName in interfaces){
          var iface = interfaces[devName];
          for(var i = 0;i < iface.length; i++){
               var alias = iface[i];

               if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                     return alias.address;
               }
          }
    }
}

export default merge(commonConf, {
    plugins: [
        // new HtmlWebpackHarddiskPlugin(),
        // 生成 html 文件
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.html'),
            // alwaysWriteToDisk: true,
            inject: true
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../'),
        compress: true,
        disableHostCheck: true,
        host: getIPAdress(),
        port: 8484,
        publicPath: '/dist/',
        setup(app) {
            // favicon
            // app.all('/favicon.ico', (req, res, next) => {
            //     req.url = '/mock/favicon.ico';
            //     next();
            // });

            // ajax 处理
            // app.all(/ajax($|\?)/i, (req, res, next) => {
            //     let json = fs.readFileSync(path.resolve(__dirname, `../mock/${req.path}.json`));
            //     // mock 文件使用方法：http://mockjs.com/examples.html
            //     res.send(Mock.mock(JSON.parse(json)));
            //     next();
            // });

            // 页面
            app.all('/', (req, res, next) => {
                req.url = '/dist/';
                next();
            });
        }
    },
    devtool: 'source-map'
});
