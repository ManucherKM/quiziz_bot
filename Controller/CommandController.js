import CommandService from "../Service/CommandService.js";

class CommandController {

    async start(ctx) {
        try {

            if (!ctx) {
                console.log("Пустой контекст");
                return
            }

            await CommandService.start(ctx)

        } catch (e) {
            console.log(e);
        }
    }
    
}

export default new CommandController