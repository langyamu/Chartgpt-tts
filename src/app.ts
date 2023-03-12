import Koa from "koa";
import router from "./router";

const app = new Koa();

app.use(router.routes());

app.listen(9527, () => {
  console.log("Server is running on port 9527");
});
