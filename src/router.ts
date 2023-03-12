import Router from "koa-router";

const router = new Router<Record<string, unknown>, {}>();

router.get("/", async (ctx) => {
  ctx.body = "Hello, world!";
});

export default router;
