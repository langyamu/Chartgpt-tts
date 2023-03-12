import axios from "axios";
import { Context } from "koa";
import Router from "koa-router";

const router = new Router();

interface RequestBody {
  text: string;
}

router.get("/", async (ctx: Context) => {
  ctx.body = "Hello World!";
});

router.post("/api/chargpt", async (ctx: Context) => {
  const { text } = ctx.request.body as RequestBody;

  // 调用 chargpt API 将文本转化为生成的代码
  const chargptResponse = await axios.post(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      prompt: text,
      max_tokens: 1024,
      n: 1,
      stop: ["\n"],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  // 从 chargpt 的响应中提取生成的代码
  const generatedCode = chargptResponse.data.choices[0].text.trim();

  // TODO: 调用微软的 TTS 服务，将生成的代码转换为语音
  // 并将语音数据返回给客户端

  // 返回请求成功的状态码和消息
  ctx.status = 200;
  ctx.body = "OK";
});

export default router;
