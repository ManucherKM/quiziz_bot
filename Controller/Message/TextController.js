import TextService from "../../Service/Message/TextService.js";

class TextController {

    async profile(ctx) {
        try {
            if (!ctx) {
                console.log("Ошибка профиля");
                return
            }

            await TextService.profile(ctx)

        } catch (e) {
            console.log("Не удалось перейти в профиль\n\n", e);
        }
    }

    async back(ctx) {
        try {
            if (!ctx) {
                console.log("Ошибка возвращения");
                return
            }

            await TextService.back(ctx)

        } catch (e) {
            console.log("Не удалось вернуться в главное меню\n\n", e);
        }
    }

    async answers(ctx) {
        try {
            if (!ctx) {
                console.log("Ошибка при получении ответов");
                return
            }

            await TextService.answers(ctx)

        } catch (e) {
            console.log("Не удалось получить ответы\n\n", e);
        }
    }
}

export default new TextController