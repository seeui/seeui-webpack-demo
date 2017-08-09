/**
 * @file webpack 编译配置
 * @author cgzero(cgzero@cgzero.com)
 */

import webpack from 'webpack';
import merge from 'webpack-merge';
import commonConf from './webpack.common.babel';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

export default merge(commonConf, {
    plugins: [
        // js 压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        // css 压缩
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /.*\.css$/g,
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        })
    ]
});
