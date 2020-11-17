import CopyPlugin from 'copy-webpack-plugin'
import {Configuration, Output} from 'webpack'
import baseConfig from './webpack.base.config'
import * as path from 'path'

const config: Configuration = Object.assign(baseConfig, {
    mode: 'production',
    devtool: false,
    output: Object.assign(baseConfig.output as Output, {
        publicPath: '/reapop/static/',
    }),
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './src/index.prod.html',
                    to: path.resolve(__dirname, 'dist/index.html'),
                },
                {
                    from: './src/static/',
                },
            ],
        }),
    ],
})

export default config
