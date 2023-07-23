const Application = require('./framework/Application');
const userRouter = require('./src/userRouter');
const jsonParser = require('./framework/parseJSON');
const PORT = process.env.PORT || 5000;

// const server = http.createServer((req, res) => {
//     res.writeHead(200, {
//         'Content-type': 'application/json',
//     })

//     if (req.url === '/') {
//         res.end('MAIN');
//     }

//     if (req.url === '/users') {
//         const users = JSON.stringify([
//             {id: 1, name: 'user name 1'},
//             {id: 2, name: 'user name 2'},
//             {id: 3, name: 'user name 3'},
//             {id: 4, name: 'user name 4'}
//         ])
//         res.end(users);
//     }

//     if (req.url === '/posts') {
//         res.end('POSTS');
//     }

//     // Что-бы пользоватлеь получил ответ на свой запрос нужно закрыть стрим res.end(...)
// });

// server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))


const application = new Application();

application.use(jsonParser);

application.addRouter(userRouter);

application.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
