/* eslint-disable */
const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) =>
  merge(common(), {
    mode: "production",
    output: {
      filename: "[name].[contentHash].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    /* Avoid inline-*** and eval-*** use in production as they can increase bundle size and reduce the overall performance */
    /* source-map is recommended choice for production builds with high quality SourceMaps. */
    devtool: "source-map",
    optimization: {
      minimizer: [
        /* Minifying the html file. */
        new HtmlWebpackPlugin({
          template: "./src/template.html",
          minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
          },
        }),
        /* A plugin that optimizes/minifies CSS assets. */
        new OptimizeCssAssetsPlugin(),
        /* A minifier for JavaScript files. */
        new TerserPlugin(),
      ],
    },
    plugins: [
      /* Extracting the css into a separate file. */
      new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
      /* Cleaning the dist folder before each build. */
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, //3. Extract css into files
            "css-loader", //2. Turns css into commonjs
            "sass-loader", //1. Turns sass into css
          ],
        },
      ],
    },
  });
