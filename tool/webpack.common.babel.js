/**
 * @file webpack 公共开发配置
 * @author cgzero(cgzero@cgzero.com)
 */

import webpack from 'webpack';
import path from 'path';
import nib from 'nib';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    // 页面入口文件配置
    entry: [
        path.resolve(__dirname, '../src/index.js')
    ],
    // output 项告诉 webpack 怎样存储输出结果以及存储到哪里
    output: {
        // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        // path 仅仅告诉 Webpack 结果存储在哪里
        path: path.resolve(__dirname, '../dist'),
        // 构建后文件名
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
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    // paths=node_modules 指定 stylus 文件的寻找范围
                    use: [
                        'css-loader',
                        {
                            loader: 'stylus-loader',
                            options: {
                                // stylus 引入 nib 库
                                // 文档：http://tj.github.io/nib/
                                // 代码：https://github.com/tj/nib
                                use: [nib()]
                            }
                        }
                    ],
                    // 覆盖上面的 publicPath，这里用了相对路径，专门针对字体和背景图片的加载
                    // 因为使用了 ExtractTextPlugin 将 css 拆出来了，所以无法获取 runtime 中的的 publicPath
                    // https://github.com/webpack-contrib/sass-loader/issues/121
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

