import DbController from "../Controller/DbController.js"
import { createClient } from 'redis';

const db = process.env.DBURL;

const client = createClient({
    url: db
});

client.on('error', (err) => console.log('Не удалось подключиться к БД', err));

await client.connect();

class UserService {

    async get(id) {

        const user = await DbController.get(id);

        if (!user) {
            throw new Error("Не удалось найти пользователя")
        }

        return user
    }

    async create(userInfo) {

        const user = await DbController.create(userInfo.id, userInfo)

        if (!user) {
            throw new Error("Не удалось создать пользователя")
        }

        return user
    }
    
}

export default new UserService