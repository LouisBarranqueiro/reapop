import path from 'path'
import webpack, {Configuration} from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import express from 'express'
import webpackConfig from './webpack.dev.config'

const app = express()
const port = process.env.PORT || 3000
const compiler = webpack(webpackConfig)

app.use(
    webpackDevMiddleware(compiler, {
        publicPath: (webpackConfig as Configuration).output!.publicPath as string,
    })
)
app.use(webpackHotMiddleware(compiler))

// Serve static files.
app.use('/static', express.static(path.join(__dirname, '/src/static')))

// Send `index.html` file for all other routes.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/src/index.html'))
})
app.set('port', port)
app.listen(app.get('port'), () => {
    console.log(`Demo available at http://localhost:${port}`)
})
