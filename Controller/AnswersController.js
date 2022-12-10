import AnswersService from "../Service/AnswersService.js";

class AnswersController {

    async withСode(code) {

        if (!code) {
            return
        }

        const answers = AnswersService.withСode(code);

        if (!answers) {
            return
        }

        return answers
    }
}

export default new AnswersController