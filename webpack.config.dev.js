const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// const isDev = process.env.NODE_ENV !== "production";

module.exports = env => {
  if (!env || (env && !env.dirname)) {
    console.warn("please specify env and directory name!");
    process.exit(1);
  }
  const { dirname } = env;
  const NODE_ENV = "development";
  return {
    entry: path.join(__dirname, `./static/${dirname}/index.js`),
    output: {
      path: path.resolve(__dirname, `./dist/${dirname}`),
      filename: `${dirname}.bundle.js`,
      // publicPath: "/"
    },
    resolve: {
      extensions: [".js", ".jsx"]
    },
    devtool: "eval",
    devServer: {
      contentBase: path.join(__dirname, "./static", dirname),
      compress: false,
      port: 8888
    },
    mode: NODE_ENV,
    module: {
      rules: [
        {
          test: /\.css/,
          loader: ["style-loader", "css-loader", "less-loader"]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader"
        },
        {
          test: /\.(jpg|gif|woff|woff2|eot|ttf)/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 100000
              }
            }
          ]
        },
        {
          test: /\.svg/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 100000,
                minetype: "image/svg+xml"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(NODE_ENV)
        }
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(__dirname, "./static", dirname, "index.html"),
        title: dirname,
        minify: true
      }),
    ]
  };
};
// console.log(process.env.NODE_ENV);
