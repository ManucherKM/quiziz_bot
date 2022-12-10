import UserService from "../Service/UserService.js";

class UserController {

    async getUser(id) {
        try {
            if (!id) {
                console.log("ID пользователя пустой");
                return
            }

            const user = await UserService.getUser(id)

            if (!user) {
                console.log("Пользователь не найден");
                return
            }

            return user
        } catch (e) {
            console.log("не удалось найти пользователя\n\n", e);
            return
        }
    }

    async createUser(id) {
        try {

            if (!id) {
                console.log("ID пользователя пустой");
                return
            }

            const user = await UserService.createUser(id)

            if (!user) {
                console.log("Не удалось добавить пользователя в БД");
                return
            }

            return user
        } catch (e) {
            console.log(e);
            return
        }
    }
}

export default new UserController