import UserService from "../Service/UserService.js";

class UserController {

    async get(id) {
        try {
            if (!id) {
                console.log("ID пользователя пустой");
                return
            }

            const user = await UserService.get(id)

            if (!user) {
                console.log("Пользователь не найден");
                return
            }

            return user
        } catch (e) {
            console.log(e);
            return
        }
    }

    async create(userInfo) {
        try {

            if (!userInfo) {
                console.log("Некорректная информация о пользователе");
                return
            }

            const user = await UserService.create(userInfo)

            if (!user) {
                console.log("Не удалось создать пользователя");
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