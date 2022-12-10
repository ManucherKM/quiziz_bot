import fetch from "node-fetch";

class AnswersService {

    async withСode(code) {

        const fetchData = await fetch("https://api.quizit.online/quizizz/answers?pin=" + code.trim());

        const { data } = await fetchData.json();

        if (!data) {
            return
        }

        return data
    }
}

export default new AnswersService