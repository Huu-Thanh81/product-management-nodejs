const express = require("express");
const router = express.Router();
const productController = require("../../controllers/admin/product.controller");
// const storage = require("../../helper/storgeMulter");
// const upload = multer({ storage: storage() });
const validePost = require("../../validates/product.validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const multer = require("multer");
const upload = multer();
router.get("/", productController.index);
router.patch(
  "/change-status/:status/:id/resource",
  productController.changeStatus,
);
router.patch("/change-multi/resource", productController.changeMulti);
router.delete("/deleted/:id/resource", productController.deleteItem);
router.get("/create", productController.create);
router.get("/edit/:id", productController.edit);
router.patch(
  "/edit/:id/resource",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validePost,
  productController.editProduct,
);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validePost,
  productController.post,
);
module.exports = router;
router.get("/detail/:id", productController.detail);
