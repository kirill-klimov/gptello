const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = env => {
    return {
        entry: './src/index.ts', // the entry point of your app
        target: 'node', // target Node.js environment
        // exclude node_modules from the bundle
        externals: [
            nodeExternals(),
            // { 'express': { commonjs: 'express' }, },
            { 'aws-sdk': { commonjs: 'aws-sdk' }, },
        ],
        externalsPresets: {
            node: true // in order to ignore built-in modules like path, fs, etc. 
        },
        mode: 'development', // set the mode to production or development

        // configure the output directory and filename
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },

        resolve: {
            extensions: ['.ts', '.js'], // enable TypeScript and JavaScript resolution
        },

        module: {
            rules: [
            {
                test: /\.ts$/, // apply this rule to .ts files
                use: 'ts-loader', // use the ts-loader for TypeScript compilation
                exclude: /node_modules/,
            },
            ],
        },

        plugins: [
            new Dotenv({
                path: env.production ? './.env.production' : './.env'
            })
        ],
    }
};