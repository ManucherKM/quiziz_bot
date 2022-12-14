import UserController from "../Controller/UserController.js";
import Keyboard from "../Keyboard/index.js"

class CommandService {

    async start(ctx) {

        const { is_bot, language_code, ...userInfo } = ctx.from;

        const user = await UserController.create(userInfo);

        if (!user) {
            await ctx.reply("Похоже, что бот решил немного отдохнуть😴", { reply_markup: Keyboard.back });
            throw new Error("Не удалось выполнить команду start")
        }

        await ctx.reply("Приветствие", { reply_markup: Keyboard.start });
    }

}

export default new CommandService