import Keyboard from "../Keyboard/index.js";
import AnswersController from "../Controller/AnswersController.js"

class SessionService {

    async answers(conversation, ctx) {

        await ctx.reply("Введите код викторины.", { reply_markup: Keyboard.back });

        const message = await conversation.wait();

        const textMessage = message.update.message.text

        const textKeyboardBack = Keyboard.back.keyboard[0][0].text;

        if (textMessage === textKeyboardBack) {
            await ctx.reply("Главное меню", { reply_markup: Keyboard.start });
            return
        }

        const code = textMessage.trim();

        const isCorrect = /[0-9]{6}/.test(code);

        const textErr = "<b>Неверный код викторины.</b>\n\nКод викторины состоит <b>ТОЛЬКО</b> из чисел.\n\nПример: <b>346108</b>";

        if (!isCorrect) {
            await ctx.reply(textErr,
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

        let countAnswers = 0;

        const sizeAnswers = answers.length;

        for (let i = 0; i < sizeAnswers; i++) {

            const item = answers[i];

            const question = item.question.text.split(">")[1].split("<")[0].trim();
            const answer = item.answers;
            const typeQuestion = item.type;

            const formatAnswers = await AnswersController.formatAnswers(answer, typeQuestion);

            if (!formatAnswers) {

                const textErrAnswer = `<b>${question}</b>\n\n<b>Ответ:\n\n</b>Бот не может получить ответ на этот вопрос.`;

                await ctx.reply(textErrAnswer,
                    {
                        reply_markup: Keyboard.again,
                        parse_mode: "HTML"
                    }
                );

            } else {
                countAnswers++

                const sendAnswer = formatAnswers.join("");

                const sendText = `<b>Вопрос ${i + 1}:</b>\n\n${question}\n\n<b>Ответ:\n\n</b>${sendAnswer}`;

                await ctx.reply(sendText,
                    {
                        parse_mode: "HTML"
                    }
                );

                const isLast = i === sizeAnswers - 1;

                if (isLast) {

                    const sendStats = `Бот нашел ответы на <b>${countAnswers}</b> вопросов из <b>${sizeAnswers}</b>`;

                    await ctx.reply(sendStats,
                        {
                            reply_markup: Keyboard.again,
                            parse_mode: "HTML"
                        }
                    );
                }
            }
        }
    }
}

export default new SessionService