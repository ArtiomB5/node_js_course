// readable - чтение
// writable - запись
// duplex - для чтения и записи = readable + writable
// transform - duplex + возможность изменять данные по мере чтения

// fs.readFile, fs.readStream и fs.createReadStream - это три разных метода для чтения файлов в Node.js.
// fs.readFile - это асинхронный метод, который читает содержимое файла целиком в память и затем вызывает обратный вызов с содержимым файла. Это хорошо подходит для небольших файлов, но может привести к проблемам с памятью при чтении больших файлов.
// fs.readStream - это метод потокового чтения, который читает файл по частям и передает данные в поток. Это хорошо подходит для чтения больших файлов, так как он не загружает весь файл в память.
// fs.createReadStream - это метод потокового чтения, который читает файл по частям и передает данные в поток. Он работает асинхронно и может использоваться для чтения больших файлов.
// Таким образом, если вы работаете с небольшими файлами, то лучше использовать fs.readFile. Если же вы работаете с большими файлами, то лучше использовать fs.readStream или fs.createReadStream.
// Я надеюсь, что это поможет вам! Если у вас есть какие-либо дополнительные вопросы, пожалуйста, не стесняйтесь задавать их мне.

// Stream и Thread - это два разных концепта.
// Stream - это поток данных, который может быть использован для чтения или записи данных в Node.js. Он может быть использован для чтения больших файлов или для передачи данных между процессами.
// Thread - это поток выполнения кода в операционной системе. В Node.js используется один поток выполнения кода, который управляется циклом событий. Однако Node.js также поддерживает многопоточность через использование вспомогательных потоков.
// Таким образом, Stream и Thread - это два разных концепта, которые используются для разных целей. Если у вас есть какие-либо дополнительные вопросы, пожалуйста, не стесняйтесь задавать их мне.

const fs = require('fs');
const path = require('path');

const readableStream = fs.createReadStream(path.resolve(__dirname, 'loremImpus.txt'));
// stream работает по принципу событий - необходимо подписываться

// Один чанк по дефолту - 64кб
readableStream.on('data', (chank) => {
    // chank - прочитанная часть файла

    console.log(chank);
})
readableStream.on('end', () => console.log('Has been finished reading!'));
readableStream.on('open', () => console.log('Has been start reading!'));
readableStream.on('error', (e) => console.log('Read Stream Error:', e));
// без обработки ошибки стрима может упасть node

const writableStream = fs.createWriteStream(path.resolve(__dirname, 'forWritableStreamTest.txt'));
for (let i = 0; i < 20; i++) {
    writableStream.write(i + '\n');
};
writableStream.end();
// writableStream нужно завершать вручную

const http = require('http');

// req - readable stream
// res - rwritable stream

http.createServer((req, res) => {
    const stream = fs.createReadStream(path.resolve(__dirname, 'loremImpus.txt'));
    stream.pipe(res);
})