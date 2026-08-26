const Product = require("../../models/product.model");

// [GET] /client/product
module.exports.index = async (req, res) => {
  const products = await Product.find({
    deleted: false,
    status: "active",
  });
  const newProducts = products.map((item) => {
    item.newPrice = (
      (item.price * (100 - item.discountPercentage)) /
      100
    ).toFixed(0);
    return item;
  });
  res.render("client/pages/products/index.pug", {
    titlePage: "Sản phẩm",
    products: newProducts,
  });
};
// [GET] /client/product/:slug
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug;
    const products = await Product.findOne({
      slug: slug,
      deleted: false,
      status: "active",
    });
    products.newPrice = (
      (products.price * (100 - products.discountPercentage)) /
      100
    ).toFixed(0);
    res.render("client/pages/products/detail.pug", {
      titlePage: "Sản phẩm",
      products: products,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};
