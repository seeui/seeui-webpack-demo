/**
 * @file webpack 公共开发配置
 * @author cgzero(cgzero@cgzero.com)
 */

import webpack from 'webpack';
import path from 'path';
import nib from 'nib';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    entry: [
        path.resolve(__dirname, '../src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash:8].js',
        // 构建后在 html 里的路径，一般也是用这个来指定上线后的cdn域名
        // http://webpack.github.io/docs/configuration.html#output-publicpath
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.html(\?.*)?$/,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|gif)$/,
                // 小于 8k 的图片将会被转成 base64
                loader: ['url-loader?limit=8192&name=img/[name].[hash:8].[ext]']
            },
            // compile seeui-mobile js
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: [
                    path.resolve(__dirname, '../node_modules/seeui-mobile')
                ]
            },
            // compile seeui-mobile css
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                    publicPath: './'
                })
            },
            // compile seeui-mobile font
            {
                test: /\.(svg|eot|ttf|woff)$/,
                loader: ['file-loader?name=font/[name].[hash:8].[ext]']
            }
        ]
    },
    plugins: [
        // 将 css 从 js 抽取出来，不杂糅在 js 中
        new ExtractTextPlugin('[name].[hash:8].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ]
};

