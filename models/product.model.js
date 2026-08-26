const mongoose = require("mongoose");
//mongoose-slug-updater giúp bạn tự động tạo slug từ title hoặc các field khác, rất hữu ích khi xây dựng URL cho sản phẩm, bài viết, danh mục,
//dùng slug sẽ chuyên nghiệp và an toàn hơn.
//slug: dùng cho URL.
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { type: String, slug: "title", unique: true },
    deleted: { type: Boolean, default: false },
    deletedAt: Date,
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;
