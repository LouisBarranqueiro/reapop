import webpack, {Configuration, Output} from 'webpack'
import baseConfig from './webpack.base.config'

const config: Configuration = Object.assign(baseConfig, {
    mode: 'development',
    devtool: 'inline-cheap-source-map',
    entry: [...(baseConfig.entry as string[]), 'webpack-hot-middleware/client'],
    output: Object.assign(baseConfig.output as Output, {
        publicPath: '/static/',
    }),
    plugins: [new webpack.HotModuleReplacementPlugin()],
})

export default config
