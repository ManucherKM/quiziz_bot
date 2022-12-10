import Keyboard from "../Keyboard/index.js";
import AnswersController from "../Controller/AnswersController.js"

class SessionService {

    async answers(conversation, ctx) {

        await ctx.reply("Введите код викторины.", { reply_markup: Keyboard.back });

        const { message: { text } } = await conversation.wait();

        const textKeyboardBack = Keyboard.back.keyboard[0][0].text;

        if (text === textKeyboardBack) {
            await ctx.reply("Главное меню", { reply_markup: Keyboard.start });
            return
        }

        const code = text;

        const answers = await AnswersController.withСode(code)

        if (answers == null) {
            await ctx.reply("Неккоректный код викторины", { reply_markup: Keyboard.again });
            return
        }

    }
}

export default new SessionService