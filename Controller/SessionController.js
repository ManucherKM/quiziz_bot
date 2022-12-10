import SessionService from "../Service/SessionService.js";

class SessionController {

    async answers(conversation, ctx) {
        try {
            if (!conversation || !ctx) {
                return
            }

            await SessionService.answers(conversation, ctx)

        } catch (e) {
            console.log("Не удалось выполнить сессию\n\n", e);
        }
    }
}

export default new SessionController