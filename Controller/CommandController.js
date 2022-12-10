import CommandService from "../Service/CommandService.js";

class CommandController {

    async start(ctx) {
        try {

            if (!ctx) {
                return
            }

            await CommandService.start(ctx)

        } catch (e) {
            console.log("Не удалось выполнить команду start\n\n", e);
        }
    }
}

export default new CommandController