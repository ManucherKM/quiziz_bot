import UserController from "../../Controller/UserController.js";
import Keyboard from "../../Keyboard/index.js";

class TextSevice {

    async profile(ctx) {

        const senderInfo = ctx.from;

        const candidate = await UserController.get(senderInfo.id);

        if (!candidate) {
            throw new Error("Кандидат не найден в БД");
        }

        const { is_bot, language_code, ...otherInfo } = senderInfo;

        const user = await UserController.create(otherInfo);

        if (!user) {
            await ctx.reply("Похоже, что бот решил немного отдохнуть😴", { reply_markup: Keyboard.back });
            throw new Error("Не удалось создать пользователя");
        }

        const message = {
            id: `<b>ID:</b> ${user.id}\n\n`,
            name: `<b>Имя пользователя:</b> ${user.first_name}\n\n`,
            user: `<b>Пользователь:</b> <a href="t.me/${user.username}">${user.first_name}</a>\n\n`
        }

        await ctx.reply(
            `${message.id}${message.name}${message.user}`,
            {
                parse_mode: "HTML",
                reply_markup: Keyboard.back
            }
        );

        return
    }

    async back(ctx) {
        await ctx.reply("Главное меню", { reply_markup: Keyboard.start });
    }

    async answers(ctx) {
        await ctx.conversation.enter("answers");
    }
}

export default new TextSevice