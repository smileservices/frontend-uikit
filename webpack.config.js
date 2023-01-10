module.exports = (env, argv) => ({
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    entry: {
        // just create the react-bundle once

        //for dev
        'static/js/react-bundle': argv.mode === 'production'
            ? ['./app/static/react_files/react.min.js', './app/static/react_files/react-dom.min.js']
            : ['./app/static/react_files/react.development.js', './app/static/react_files/react-dom.development.js'],

        //mapping of <js file destination>: <react source>
        '/static/js/homepage-app': './app/frontend/src/HomepageApp.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/app/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
});