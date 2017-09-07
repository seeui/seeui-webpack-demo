/**
 * @file webpack 开发配置
 * @author cgzero(cgzero@cgzero.com)
 */

import path from 'path';
import commonConf from './webpack.common.babel';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default merge(commonConf, {
    plugins: [
        // 生成 html 文件
        new HtmlWebpackPlugin({
            filename: 'pc.html',
            template: path.resolve(__dirname, '../src/pc.html'),
            inject: true,
            chunks: ['pc']
        }),
        // 生成 html 文件
        new HtmlWebpackPlugin({
            filename: 'mobile.html',
            template: path.resolve(__dirname, '../src/mobile.html'),
            inject: true,
            chunks: ['mobile']
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../'),
        compress: true,
        disableHostCheck: true,
        host: '0.0.0.0',
        port: 8484,
        publicPath: '/dist/',
        setup(app) {
            // 页面
            app.all('/pc', (req, res, next) => {
                req.url = '/dist/pc.html';
                next();
            });
            // 页面
            app.all('/mobile', (req, res, next) => {
                req.url = '/dist/mobile.html';
                next();
            });
        }
    },
    devtool: 'source-map'
});
