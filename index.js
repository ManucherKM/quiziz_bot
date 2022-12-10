import "dotenv/config";
import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import CommandController from "./Controller/CommandController.js";
import TextController from "./Controller/Message/TextController.js"
import SessionController from "./Controller/SessionController.js"

const TOKEN = process.env.TOKEN;

const bot = new Bot(TOKEN);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(createConversation(SessionController.answers, "answers"));

bot.command("start", async (ctx) => {
    await CommandController.start(ctx)
});

bot.on("message:text", async (ctx) => {
    const message = ctx.message.text;

    if (message === "💼 Профиль") {
        await TextController.profile(ctx);
        return
    }

    if (message === "🚀 Ответы") {
        await TextController.answers(ctx)
        return
    }

    if (message === "🔄 Попробовать снова") {
        await TextController.answers(ctx)
        return
    }

    if (message === "🔙 Назад") {
        await TextController.back(ctx)
    }
})

bot.start();