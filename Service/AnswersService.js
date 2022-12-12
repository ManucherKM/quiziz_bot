import fetch from "node-fetch";

class AnswersService {

    async withСode(code) {

        const fetchData = await fetch("https://api.quizit.online/quizizz/answers?pin=" + code);

        const { data } = await fetchData.json();

        if (!data) {
            return
        }

        return data
    }

    async formatAnswers(answer, typeQuestion) {
        const result = [];

        if (typeQuestion == "MSQ") {

            for (let i = 0; i < answer.length; i++) {
                const item = answer[i];

                let newAnswer = ""

                if (i === answer.length - 1) {
                    newAnswer = item.text.replace("<p>", "").replace("</p>", "");
                } else {
                    newAnswer = item.text.replace("<p>", "").replace("</p>", ", ");
                }

                result.push(newAnswer);
            }

        }

        if (typeQuestion == "MCQ") {
            const newAnswer = answer[0].text.replace("<p>", "").replace("</p>", "");
            result.push(newAnswer)
        }

        if (typeQuestion == "BLANK") {
            for (let i = 0; i < answer.length; i++) {
                const item = answer[i];

                let newAnswer = `\n${i + 1}) ${item.text}`;

                result.push(newAnswer);
            }
        }

        if (typeQuestion == "REORDER") {
            for (let i = 0; i < answer.length; i++) {

                const item = answer[i];

                let newAnswer = item.text.replace("<p>", `\n${i + 1}) `).replace("</p>", "");

                result.push(newAnswer);
            }
        }

        if (typeQuestion == "MATCH") {

            for (let i = 0; i < answer.length; i++) {
                const item = answer[i];

                let newAnswer = item.text
                    .replace('<div class="match"><p>', `\n${i + 1}) `)
                    .replace("</p> -> <p>", " => ")
                    .replace("</p></div>", "\n");

                result.push(newAnswer);
            }
        }

        return result
    }
}

export default new AnswersService