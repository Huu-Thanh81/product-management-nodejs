const clientRouter = require("./routers/client/index.router");
const dashbordRouter = require("./routers/admin/index.router");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash"); //thông báo
const express = require("express");
const bodyParser = require("body-parser");
var methodOverride = require("method-override"); //ghi đề http method
const database = require("./config/database");
database.connect(process.env.MONGO_URI);
const systemConfig = require("./config/system");
const app = express();
app.use(cookieParser("fdfdfdsf"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
app.use(bodyParser.urlencoded()); // cho truyền req.body
app.use(methodOverride("_method"));
app.use(express.static("public"));
// app.use("URL", express.static("THƯ_MỤC_THẬT"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist"));
const port = process.env.PORT;
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));
app.locals.prefixAdmin = systemConfig.prefixAdmin; //chỉ dùng được trong các file Pug/EJS

clientRouter(app);
dashbordRouter(app);

app.listen(port, () => {
  console.log(`http://localhost:3000 listening on port ${port}`);
});
