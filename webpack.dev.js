const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const dotenv = require("dotenv");

module.exports = (env) =>
  merge(common(env), {
    mode: "development",
    devServer: {
      open: true, // auto open the browser
      static: { directory: path.join(__dirname, "public") },
      compress: true,
      port: Number(process.env.PORT) || 3000,
      /* Telling the server to fallback to index.html if the route is not found at the backend server */
      historyApiFallback: true,
    },
  });
