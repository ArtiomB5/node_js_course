const http = require('http');
const EventEmitter = require('events');

module.exports = class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    listen(port, callback) {
        this.server.listen(port, callback);
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    addRouter(router) {
        Object.keys(router.endpoints).forEach(path => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                const handler = endpoint[method];
                this.emitter.on(this._gerRouteMask(path, method), (req, res) => {
                    this.middlewares.forEach(middleware => middleware(req, res));
                    handler(req, res);
                })
            })
        })
    }

    _createServer() {
        return http.createServer((req, res) => {
            let body = '';
            req.on('data', (chunk) => {
                body = body + chunk;
                console.log(chunk);
            })
            req.on('end', () => {
                if (body) {
                    req.body = JSON.parse(body);
                }
                const emitted = this.emitter.emit(this._gerRouteMask(req.url, req.method), req, res);
                // когда эмиттим событие, то будет возвращено значение false, если такого события нету
                if (!emitted) {
                    res.end();
                }
            })
        });
    }

    _gerRouteMask(path, method) {
        return `[${path}]:[${method}]`;
    }
}