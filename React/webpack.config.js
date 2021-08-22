const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const localIdentName = () => process.env.NODE_ENV === 'development' ?
        '[name]__[local]___[hash:base64:5]'
    :
        '[hash:base64:5]';

module.exports = {
    entry: {
        demo: [
            './src/Demo.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build/public'),
        publicPath: process.env.ASSET_PATH || '/public/',
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },
    mode: process.env.NODE_ENV || 'production',
    devtool: 'source-map',
    devServer: {
        contentBase: [
            path.resolve(__dirname, 'build'),
            path.resolve(__dirname, 'build/public')
        ],
        contentBasePublicPath: [
            path.resolve(__dirname, '/'),
            path.resolve(__dirname, '/public/')
        ],
        // static:[
        //     {
        //         directory: path.join(__dirname, 'build/assets'),
        //         publicPath: '/assets',
        //     },
        //     {
        //         directory: path.join(__dirname, 'build/public'),
        //         publicPath: '/public',
        //     }
        // ],
        publicPath: '/public/',
        stats: 'errors-warnings',
        hot: true,
        host: '0.0.0.0',
        port: process.env.PORT || 8085,
        watchOptions: {
            poll: true
        },
        disableHostCheck: true,
    },
    target: 'web',
    resolve: {
        fallback: {
            "fs": false,
            "buffer": false,
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: ['@babel/transform-runtime']
                }
            },
            {
                test: /global\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /global\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: {
                                localIdentName: localIdentName(),
                            },
                        }
                    },
                ],
                sideEffects: true,
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].[chunkhash].css',
            ignoreOrder: true,
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!*.sql', '!*.html', 'index.html', '!*.ejs', '!widget.css', '!*.ttf'],
            dangerouslyAllowCleanPatternsOutsideProject: true,
        }),
        new HtmlWebpackPlugin({
            title: 'Demo Dates',
            chunks: ['demo'],
            filename: '../demo.html',
            inject: false,
            template: 'build/template.ejs'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        })
    ],
};