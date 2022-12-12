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

        const code = text.trim();

        const isCorrect = /[0-9]{6}/.test(code);

        if (!isCorrect) {
            await ctx.reply("<b>Неверный код викторины.</b>\n\nКод викторины состоит <b>ТОЛЬКО</b> из чисел.\n\nПример: <b>346108</b>",
                {
                    reply_markup: Keyboard.again,
                    parse_mode: "HTML"
                });
            return
        }

        const { answers } = await AnswersController.withСode(code);

        if (!answers) {
            await ctx.reply("Неккоректный код викторины", { reply_markup: Keyboard.again });
            return
        }

        for (const item of answers) {

            const question = item.question.text.split(">")[1].split("<")[0].trim();
            const answers = item.answers;
            const typeQuestion = item.type;

            const formatAnswers = await AnswersController.formatAnswers(answers, typeQuestion);

            if (!formatAnswers) {
                await ctx.reply(`<b>${question}</b>\n\n<b>Ответ: </b>Бот не может получить ответ на этот вопрос.`,
                    {
                        reply_markup: Keyboard.again,
                        parse_mode: "HTML"
                    }
                );
            } else {

                let sendAnswer = formatAnswers.join("");

                await ctx.reply(`<b>${question}</b>\n\n<b>Ответ: </b>${sendAnswer}`,
                    {
                        reply_markup: Keyboard.again,
                        parse_mode: "HTML"
                    }
                );
            }

        }


    }
}

export default new SessionService