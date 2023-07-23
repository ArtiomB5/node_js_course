const http = require('http');
const EventEmitter = require('emitter');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type': 'application/json',
    })

    if (req.url === '/') {
        res.end('MAIN');
    }

    if (req.url === '/users') {
        const users = JSON.stringify([
            {id: 1, name: 'user name 1'},
            {id: 2, name: 'user name 2'},
            {id: 3, name: 'user name 3'},
            {id: 4, name: 'user name 4'}
        ])
        res.end(users);
    }

    if (req.url === '/posts') {
        res.end('POSTS');
    }

    // Что-бы пользоватлеь получил ответ на свой запрос нужно закрыть стрим res.end(...)
});

server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))

class Router {
    constructor() {
        this.endpoints = {
        }
    }

    request(method = 'GET', path,  handler) {
        if(!this.endpoints[path]) {
            this.endpoints[path] = {}
        }

        const endpoint = this.endpoints[path];

        if (endpoint[method]) {
            throw new Error(`[${method}] with path ${path} is already existed`);
        }

        endpoint[method] = handler;
    }
}