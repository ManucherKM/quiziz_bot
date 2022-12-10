class UserService {

    async getUser(id) {
        const user = {
            id: Date.now(),
            name: "Пользователь получен",
            firstName: "qwe"
        }

        if (!user) {
            throw new Error("Ошибка поиска пользователя")
        }

        return user
    }

    async createUser(id) {
        const user = {
            id: Date.now(),
            userName: "Новый пользователь"
        }

        if (!user) {
            throw new Error("Ошибка создания пользователя")
        }

        return user
    }
}

export default new UserService