const path = require('path');

console.log('Склеить участки пути', path.join('1', '22', '333', '4444'));

console.log(__dirname);
// __dirname - содержит путь к текущей директории
// /home/artiom/Documents/Projects/node_js_course/lessons

console.log(__filename);
// __filename - содержит путь к текущему файлу
// /home/artiom/Documents/Projects/node_js_course/lessons/path.js

console.log('Склеить участки пути', path.join(__dirname, '..'));

console.log('Склеить участки пути', path.join(__dirname, '..', '..'));

console.log('Получить абсолютный путь', path.resolve('1', '22'));
// /home/artiom/Documents/Projects/node_js_course/1/22

const fullPath = path.resolve('1', '22');
console.log('full path', fullPath);

const parsedFullPath = path.parse(fullPath);
console.log('Парсинг пути', parsedFullPath);
// {
//     root: '/',
//     dir: '/home/artiom/Documents/Projects/node_js_course/1',
//     base: '22',
//     ext: '',
//     name: '22'
// }

console.log('Разделитель в ОС', path.sep);
console.log('Проверка на абсолютный путь', path.isAbsolute(String(parsedFullPath)));
console.log('Название файла', path.basename(__filename));
console.log('Расширение файла', path.extname(__filename));

// _________________________________

const siteURL = 'http://localhost:8080/users?id=5123'

const url = new URL(siteURL);

console.log(url);