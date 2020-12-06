const path = require("path");

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: ["@babel/polyfill","./src/app.tsx"],
    output: {
        filename: "main.js",
        path: path.resolve( __dirname, "dist"),
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
      },
    devtool: "inline-source-map",
    module:{
        rules:[
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options:{
                        presets:[
                            "@babel/preset-env",
                            "@babel/preset-typescript",
                            "@babel/preset-react"
                        ]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: __dirname,
        port: 5000
    },
};