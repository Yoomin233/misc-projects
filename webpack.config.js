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
  const NODE_ENV = env.NODE_ENV || "development";
  return {
    entry: `./static/${dirname}/index.js`,
    output: {
      path: path.resolve(__dirname, `./dist/${dirname}`),
      filename: `${dirname}.bundle.js`,
      publicPath: "./"
    },
    mode: NODE_ENV,
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
      new CopyWebpackPlugin([
        {
          from: path.join(__dirname, './static', dirname, 'style.css'),
          to: path.join(__dirname, './dist', dirname)
        }
      ])
    ]
  };
};
// console.log(process.env.NODE_ENV);
