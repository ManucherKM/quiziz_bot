import Keyboard from "../Keyboard/index.js";
import SessionService from "../Service/SessionService.js";

class SessionController {

    async answers(conversation, ctx) {
        try {
            if (!conversation || !ctx) {
                return
            }

            await SessionService.answers(conversation, ctx)

        } catch (e) {
            console.log("Не удалось выполнить сессию\n\n", e);
            await ctx.reply("Бот не смог получить ответы на викторину", { reply_markup: Keyboard.again });
        }
    }
}

export default new SessionController