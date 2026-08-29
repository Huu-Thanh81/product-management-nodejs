const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelpper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const prefixAdmin = require("../../config/system");

// [GET] /admin/product
module.exports.index = async (req, res) => {
  let findQuery = {
    deleted: false,
  };
  // fillter
  const filterStatus = filterStatusHelper(req.query, findQuery);
  //Search
  const objectSearch = searchHelpper(req.query);
  if (objectSearch.regex) {
    findQuery.title = objectSearch.regex;
  }
  //Pagination
  const totalPage = await Product.countDocuments({ deleted: false });
  const pagination = paginationHelper(
    {
      currentPage: 1,
      limitPage: 4,
      showPagination: 2,
    },
    req.query,
    totalPage,
  );
  const products = await Product.find(findQuery)
    .sort({ position: "desc" })
    .limit(pagination.limitPage)
    .skip(pagination.skip);
  res.render("admin/pages/product/index.pug", {
    titlePage: "Trang sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    pagination: pagination,
  });
};
// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  const result = await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhật trạng thái thành công");
  // req.get("Referer") cách hiện đại để quay lại trang trước
  res.redirect(req.get("Referer"));
};
// [PATCH] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", "Cập nhật trạng thái thành công");
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    case "deleted-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() },
      );
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      break;
    default:
      break;
  }
  res.redirect(req.get("Referer"));
};
// [DELETE] /admin/product/:id/
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: true });
  req.flash("success", "Xóa thành công");
  // await Product.deleteOne({ _id: id });
  res.redirect(req.get("Referer"));
};
// [GET] /admin/product/create
module.exports.create = async (req, res) => {
  res.render(`admin/pages/product/create`);
};
// [POST] /admin/product/create
module.exports.post = async (req, res) => {
  if (!req.body.title) {
    req.flash("error", "vui lòng nhập tiêu đề");
    res.redirect(req.get("Referer"));
    return;
  }
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  req.body.position = parseInt(req.body.position);
  const coutProduct = await Product.countDocuments({});
  if (Number.isNaN(req.body.position)) {
    req.body.position = coutProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const product = new Product(req.body);
  await product.save();
  res.redirect(`${prefixAdmin.prefixAdmin}/product`);
};

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const products = await Product.findOne({ _id: id });
  res.render(`admin/pages/product/edit`, {
    products: products,
  });
};
module.exports.editProduct = async (req, res) => {
  const id = req.params.id;
  if (!req.body.title) {
    req.flash("error", "vui lòng nhập tiêu đề");
    res.redirect(req.get("Referer"));
    return;
  }
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);
  req.body.position = parseInt(req.body.position);
  req.body.position = parseInt(req.body.position);
  await Product.updateOne({ _id: id }, req.body);
  res.redirect(`${prefixAdmin.prefixAdmin}/product`);
};
module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const products = await Product.findOne({ _id: id });
  res.render(`admin/pages/product/detail`, {
    products: products,
    titlePage: products.title,
  });
};
