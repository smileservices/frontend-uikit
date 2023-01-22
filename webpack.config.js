module.exports = (env, argv) => ({
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    entry: {
        // just create the react-bundle once

        //for dev
        // 'react-bundle': argv.mode === 'production'
        //     ? ['./static/react_files/react.min.js', './static/react_files/react-dom.min.js']
        //     : ['./static/react_files/react.development.js', './static/react_files/react-dom.development.js'],

        //mapping of <js file destination>: <react source>
        'forms_create_javascript_app': './src/example_js_app/forms/CreateApp.js',
        'forms_image_app': './src/example_js_app/forms/ImageFormApp.js',
        'modal_simple_app': './src/example_js_app/modal/ModalApp.js',
        'account_app': './src/example_js_app/AccountApp.js',
        'elements_login_app': './src/example_js_app/forms/login/LoginApp.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/static/js/'
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