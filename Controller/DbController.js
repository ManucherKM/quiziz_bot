import DbService from "../Service/DbService.js";

class DbController {

    async create(name, value) {
        try {
            if (!name || !value) {
                console.log("Некорректное название переменной или ее значение");
                return
            }

            const res = await DbService.create(name, value);

            if (!res) {
                console.log("Не удалось создать переменную в БД");
                return
            }

            return res
        } catch (e) {
            console.log(e);
        }
    }

    async get(name) {
        try {
            if (!name) {
                console.log("Некорректное название переменной");
                return
            }

            const res = await DbService.get(name);

            if (!res) {
                console.log("Не удалось найти переменную в БД");
                return
            }

            return res
        } catch (e) {
            console.log(e);
        }
    }


}

export default new DbController