import {createServer, ServerResponse, IncomingMessage} from 'http';
import {v4 as uuidv4} from 'uuid';
import {IUser} from "./interfaces/data.interface";

// Массив для хранения данных
let users: IUser[] = [{id: "1234-1234-1234-1234", name: "Nick", age: 35, hobbies: ['box']}];

// Функция для отправки ответа клиенту
function sendResponse(res: ServerResponse, statusCode: number, body: any) {
    res.writeHead(statusCode, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(body));
}

// Создание HTTP-сервера
export const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    const {method, url} = req;

    // Обработчик GET-запроса для получения всех данных
    if (method === 'GET' && url === '/api/users') {
        sendResponse(res, 200, users);
    }

    // Обработчик POST-запроса для создания новых данных
    else if (method === 'POST' && url === '/api/users') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newUser: IUser = {id: uuidv4(), ...JSON.parse(body)};
            users.push(newUser);
            sendResponse(res, 201, newUser);
        });
    }

    // Обработчик PUT-запроса для обновления данных по идентификатору
    else if (method === 'PUT' && url?.startsWith('/api/users/')) {
        const id = url.slice(10); // Удаляем "/api/data/" из URL
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newUser: IUser = {...JSON.parse(body), id};
            users = users.map(item => (item.id === id ? newUser : item));
            sendResponse(res, 200, newUser);
        });
    }

    // Обработчик DELETE-запроса для удаления данных по идентификатору
    else if (method === 'DELETE' && url?.startsWith('/api/users/')) {
        const id = url.slice(10); // Удаляем "/api/data/" из URL
        users = users.filter(item => item.id !== id);
        sendResponse(res, 204, null);
    }

    // Обработчик ошибки для неизвестных запросов
    else {
        sendResponse(res, 404, {error: 'Not Found'});
    }
});
