const fs = require('fs');
const path = require('path');

// fs.mkdirSync(path.resolve(__dirname, 'dir'))
// mkdirSync - блокирует главный поток

// fs.mkdirSync(path.resolve(__dirname, 'dir1', 'dir2', 'dir3'), {recursive: true})
//создаст рекурсивную иерархию папок dir1/dir2/dir3

// console.log('START')

// fs.mkdir(path.resolve(__dirname, 'dir-async'),  (err) => {
//     if (err) {
//         console.log('Error mkdir:', err)
//         return;
//     }
//     console.log('Folder has been created')
// })
// mkdir - работает асинхронно - не блокирует главный поток

// console.log('END')

//-------------------

// fs.rmdir(path.resolve(__dirname, 'dir-async'), (err) => {
//     if (err) {
//         throw err;
//     }
// })
// удалит папку dir-async

//-------------------

// fs.writeFile(path.resolve(__dirname, 'test.txt'), '5 qwerty 7 qwerty 0', (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('File has been created')
// })
// запишет данные 5 qwerty 7 qwerty 0 в файл test.txt, если в файле были данные то перезапишет


// fs.appendFile(path.resolve(__dirname, 'test.txt'), '111111', (err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('File has been updated')
// })
// добавит данные 111111 в файл test.txt

const writeFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) {
                throw reject(`Error(fs.writeFile):${err.message}`);
            }
            resolve('File has been created')
        })
    })
}

const appendFileAsync = async (path, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(path, data, (err) => {
            if (err) {
                throw reject(`Error(fs.appendFile):${err.message}`);
            }
            resolve('File has been updated')
        })
    })
}

const readFileAsync = async (path) => {
    return new Promise((resolve, reject) => fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            throw reject(`Error(fs.readFile):${err.message}`);
        }
        resolve(data);
    }))
}

const removeFileAsync = async (path) => {
    return new Promise((resolve, reject) => fs.rm(path, (err) => {
        if (err) {
            throw reject(`Error(fs.readFile):${err.message}`);
        }
        resolve('removed');
    }))
}

// const filePath = path.resolve(__dirname, 'test.txt');
// writeFileAsync(filePath, 'init test txt data')
//     .then((writeFileResp) => console.log(writeFileResp))
//     .then(() => {
//         appendFileAsync(filePath, 'new data 1')
//             .then((updateFileResp) => console.log(updateFileResp));
//     })
//     .then(() => {
//         appendFileAsync(filePath, 'new data 2')
//             .then((updateFileResp) => console.log(updateFileResp));
//     })
//     .then(() => {
//         readFileAsync(filePath)
//             .then((resp) => console.log('file data', resp));
//     })

// removeFileAsync(filePath)
// .then((resp) => console.log(resp));

// const text = process.env.TEXT || '';
// const textFilePath = path.resolve(__dirname, 'testFile.txt');

// writeFileAsync(textFilePath, text)
//     .then((writeFileResp) => console.log(writeFileResp))
//     .then(() => {
//         readFileAsync(textFilePath)
//             .then((resp) => {
//                 console.log('file data', resp)
//                 const wordsCount = resp.split(' ').length;
//                 const countFilePath = path.resolve(__dirname, 'count.txt');
//                 writeFileAsync(countFilePath, `Words count: ${wordsCount}`);
//             })
//             .then(() => {
//                 removeFileAsync(textFilePath)
//                 .then((resp) => console.log(resp))
//             })
//     })
