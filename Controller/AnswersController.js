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

    async formatAnswers(answer, typeQuestion) {
        if (!answer || !typeQuestion) {
            return
        }

        const result = await AnswersService.formatAnswers(answer, typeQuestion);

        if (result.length === 0) {
            return
        }

        return result
    }
}

export default new AnswersController