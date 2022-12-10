import UserController from "../../Controller/UserController.js";
import Keyboard from "../../Keyboard/index.js";

class TextSevice {

    async profile(ctx) {
        const { id } = ctx.chat;

        const user = await UserController.getUser(id);

        if (!user) {
            throw new Error("Не удалось найти пользователя");
        }

        const infoId = `<b>ID:</b> ${user.id}\n\n`;
        const infoName = `<b>Имя пользователя:</b> ${user.name}\n\n`;
        const infoUser = `<b>Пользователь:</b> <a href="t.me/${user.firstName}">${user.name}</a>\n\n`;

        await ctx.reply(
            `${infoId}${infoName}${infoUser}`,
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