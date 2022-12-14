import { createClient } from 'redis';

const client = createClient({
    url: process.env.DBURL
});

client.on('error', (err) => console.log('Не удалось подключиться к БД', err));

await client.connect();


class DbService {

    async create(name, value) {

        const convertValue = JSON.stringify(value);
        const convertName = `${name}`;

        await client.set(convertName, convertValue);

        const res = await client.get(convertName);

        if (!res) {
            throw new Error("Не удалось создать переменную в БД")
        }

        const convertRes = JSON.parse(res);

        return convertRes
    }

    async get(name) {
        const convertName = `${name}`;

        const res = await client.get(convertName);

        if (!res) {
            throw new Error("Не удалось найти переменную в БД")
        }

        const convertRes = JSON.parse(res);

        return convertRes
    }
}

export default new DbService