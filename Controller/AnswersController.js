import AnswersService from "../Service/AnswersService.js";

class AnswersController {

    async withСode(code) {

        if (!code) {
            console.log("Пустой код викторины");
            return
        }

        const answers = AnswersService.withСode(code);

        if (!answers) {
            console.log("Не удалось получить ответы от викторины");
            return
        }

        return answers
    }

    async formatAnswers(answer, typeQuestion) {
        if (!answer || !typeQuestion) {
            console.log("Некорректно указан входной ответ или его тип");
            return
        }

        const res = await AnswersService.formatAnswers(answer, typeQuestion);

        if (res.length === 0) {
            return
        }

        return res
    }
}

export default new AnswersController