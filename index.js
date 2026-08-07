const clientRouter = require("./routers/client/index.router");
const express = require("express");
const app = express();
const port = 3000;
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));

clientRouter(app);

app.listen(port, () => {
  console.log(`http://localhost:3000 app listening on port ${port}`);
});
