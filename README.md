# 在 Webpack 中使用 SeeUI Mobile 的例子

## 如何预览

### 初始化

```bash
npm i
```

### 启动本地服务

```bash
npm start
```

### 编译项目

```bash
npm run build
```

### 进行代码检查（使用 [fecs](http://fecs.baidu.com/) 检查）

```bash
npm run lint
```

## 如何配置 SeeUI Mobile

### 安装依赖

```bash
# seeui-mobile
npm i seeui-mobile --save
# 编译 seeui-mobile js（stage 可以任选）
npm i babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 --save-dev
# 编译 seeui-mobile 样式的依赖
npm i style-loader css-loader stylus-loader file-loader stylus nib --save-dev
```

### 配置 Webpack

```javascript
{
    module: {
        loaders: [
            // compile seeui-mobile js
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                // 如果不想影响项目中其他 js，可以设置为只对 seeui-mobile 中的 js 做编译处理
                include: [path.resolve(__dirname, '../node_modules/seeui-mobile')]
            },
            // compile seeui-mobile css
            {
                test: /\.styl$/,
                loader: [
                    'style-loader'
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
                // 如果不想影响项目中其他 css，可以设置为只对 seeui-mobile 中的 css 做编译处理
                include: [path.resolve(__dirname, '../node_modules/seeui-mobile')]
            },
            // compile seeui-mobile font
            {
                test: /\.(svg|eot|ttf|woff)$/,
                loader: ['file-loader'],
                // 如果不想影响项目中其他 font，可以设置为只对 seeui-mobile 中的 font 做编译处理
                include: [path.resolve(__dirname, '../node_modules/seeui-mobile')]
            }
        ]
    }
}
```