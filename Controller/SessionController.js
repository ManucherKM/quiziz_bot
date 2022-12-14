import SessionService from "../Service/SessionService.js";
import Keyboard from "../Keyboard/index.js";

class SessionController {

    async answers(conversation, ctx) {
        try {
            if (!conversation || !ctx) {
                console.log("Пустой контекст или диалог");
                return
            }

            await SessionService.answers(conversation, ctx)

        } catch (e) {
            await ctx.reply("Бот не смог получить ответы на викторину", { reply_markup: Keyboard.again });
            console.log(e);
        }
    }
}

export default new SessionController