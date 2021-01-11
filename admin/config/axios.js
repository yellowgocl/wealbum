const env = require("../env");
let isProduction = process.env.NODE_ENV == "production";
module.exports = {
  // baseURL: "http://localhost:3000/",
  // credentials: true,
  proxy: true,
  timeout: 60 * 1000,
  debug: !isProduction
};
