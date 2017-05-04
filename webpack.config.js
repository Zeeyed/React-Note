module.exports = {
    entry: "./app/App.js",
    output: {
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            } 
        ]
    },
    devServer: {
        publicPath: "/",
        contentBase: "./public",
        hot: true
    }
}