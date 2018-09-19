const path = require('path');
const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass')

module.exports = withCss(({
    webpack: (config, {dev}) => {
        config.module.rules.push(            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'emit-file-loader',
                        options: {
                            name: 'dist/[path][name].[ext].js'
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            extends: path.resolve(__dirname, './.babelrc')
                        }
                    },
                    'styled-jsx-css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: dev
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        publicPath: './',
                        outputPath: 'static/',
                        name: '[name].[ext]'
                    }
                }
            });

        return config
    }
}));
//
//
// const path = require('path');
// const withCss = require('@zeit/next-css');
// const withSass = require('@zeit/next-sass')
//
// module.exports = withCss({
//     webpack: (config, {dev}) => {
//         config.module.rules.push(
//             {
//                 test: /\.scss$/,
//                 use: [
//                     {
//                         loader: 'emit-file-loader',
//                         options: {
//                             name: 'dist/[path][name].[ext].js'
//                         }
//                     },
//                     {
//                         loader: 'babel-loader',
//                         options: {
//                             babelrc: false,
//                             extends: path.resolve(__dirname, './.babelrc')
//                         }
//                     },
//                     'styled-jsx-css-loader',
//                     {
//                         loader: 'sass-loader',
//                         options: {
//                             sourceMap: dev
//                         }
//                     }
//                 ]
//             },
//             {
//                 test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
//                 use: {
//                     loader: 'url-loader',
//                     options: {
//                         limit: 100000,
//                         publicPath: './',
//                         outputPath: 'static/',
//                         name: '[name].[ext]'
//                     }
//                 }
//             });
//
//         return config
//     }
// });
