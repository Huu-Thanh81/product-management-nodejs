const dashbordRouter = require("./dashboard.router");
const productRouter = require("./product.router");
const systemConfig = require("../../config/system");
module.exports = (app) => {
  const prefixAdmin = systemConfig.prefixAdmin;
  app.use(prefixAdmin + "/dashboard", dashbordRouter);
  app.use(prefixAdmin + "/product", productRouter);
};
