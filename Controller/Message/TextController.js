import TextService from "../../Service/Message/TextService.js";

class TextController {

    async profile(ctx) {
        try {
            if (!ctx) {
                console.log("Пустой контекст профиля");
                return
            }

            await TextService.profile(ctx)

        } catch (e) {
            console.log(e);
        }
    }

    async back(ctx) {
        try {
            if (!ctx) {
                console.log("Пустой контекст возвращения");
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
                console.log("Пустой контекст ответов");
                return
            }

            await TextService.answers(ctx)

        } catch (e) {
            console.log("Не удалось получить ответы\n\n", e);
        }
    }
}

export default new TextController