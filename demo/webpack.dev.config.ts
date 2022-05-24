import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import webpack, {Configuration} from 'webpack'

import baseConfig from './webpack.base.config'

const config: Configuration = Object.assign(baseConfig, {
    mode: 'development',
    devtool: 'inline-cheap-source-map',
    entry: [...(baseConfig.entry as string[]), 'webpack-hot-middleware/client'],
    output: Object.assign(baseConfig.output, {
        publicPath: '/static/',
    }),
    module: {
        rules: [
            ...(baseConfig?.module?.rules || []),
            {
                test: /\.(js|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['react-refresh/babel'],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()].filter(Boolean),
})

export default config
