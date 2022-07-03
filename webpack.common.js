/* eslint-disable */
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
const Dotenv = require("dotenv-webpack");
const alias = require("./configuration/alias.ts");

// env variables from webpack CLI as --env flag can be accessed in env if needed
module.exports = (env) => {
  const ROOT = process.cwd();
  let envPath;
  // process.env.NODE_ENV is set by webpack CLI using flag --node-env
  switch (process.env.NODE_ENV) {
    case "production":
      envPath = `${ROOT}/.env/production.env`;
      break;
    case "staging":
      envPath = `${ROOT}/.env/staging.env`;
      break;
    case "testing":
      envPath = `${ROOT}/.env/testing.env`;
      break;
    default:
      envPath = `${ROOT}/.env/development.env`;
  }

  // Loading all the keys from the .env file at given path into process.env and makes it available during compilation for webpack.
  // using for webpack-dev-server to get port dynamically from the our environment file
  dotenv.config({ path: envPath });
  return {
    mode: "none",
    entry: "./index.tsx",
    /* web is Default. Telling webpack to compile the code for the web. */
    target: "web",
    output: {
      /* Dynamically generating a unique filename for the bundle.js file. */
      filename: "bundle.[contentHash].js",
      path: path.resolve(__dirname, "build"),
      clean: true,
      publicPath: "/",
    },
    plugins: [
      /* Creating a new index.html file in the build folder and injecting the bundle.js file into it. */
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./public/index.html",
      }),
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      // Dotenv replaces each process.env.variableName in our application code with the value from the .env file at the path
      // so that it becomes more secure than exposing all the keys of env file in process.env
      new Dotenv({
        path: envPath, // load this file instead of the ones in '.env'
        safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        // defaults: false, // load '.env.defaults' as the default values if empty.
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        silent: true, // hide any errors
        // prefix: "import.meta.env.", // reference your env variables as 'import.meta.env.ENV_VAR'.
      }),
    ],
    resolve: {
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts", "json", ".css", "..."],
      alias,
      fallback: {
        // no need of fs module in browser
        fs: false,
        // polyfill for os and path modules
        os: require.resolve("os-browserify/browser"),
        path: require.resolve("path-browserify"),
      },
    },
    /* For correct error line number. */
    devtool: "inline-source-map",
    module: {
      rules: [
        {
          /* A regular expression to match any imported filenames that end with .js, .jsx, .ts, .tsx. */
          test: /\.(js|ts)x?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              /* remember webpack runs the presets in reverse order i.e from last option to the first option because We need to strip off the types first before we process the JSX. */
              presets: [
                "@babel/preset-env", // compile modern JavaScript into something most browsers can
                // understand.
                ["@babel/preset-react", { runtime: "automatic" }], // to compile JSX and other stuff into vanilla JavaScript
                "@babel/preset-typescript", // to compile TypeScript into JavaScript.
              ],
            },
          },
        },
        {
          test: /\.(scss|css)$/, // regular expression to match any imported filenames that end with .css
          use: [
            "style-loader", // 3. inject those css into DOM
            "css-loader", // 2. turns css into common.js or handles import filename.css syntax
            "sass-loader", // 1. turns sass to css
          ],
        },
        // built-in rule of webpack-v5. Thus no custom loader is required.
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        // {
        //   test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
        //   loader: "url-loader",
        //   options: { limit: false },
        // },
      ],
    },
  };
};
