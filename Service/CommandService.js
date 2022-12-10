import UserController from "../Controller/UserController.js";
import Keyboard from "../Keyboard/index.js"

class CommandService {

    async start(ctx) {
        const { is_bot, language_code, ...userInfo } = ctx.from;

        const user = await UserController.createUser(userInfo);

        /*
        Работа с БД
        */

        await ctx.reply("Приветствие", { reply_markup: Keyboard.start });
    }
}

export default new CommandService