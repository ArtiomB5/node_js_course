const os = require('os');
const cluster = require('cluster');

// console.log(os.platform());
// console.log(os.arch());

// console.log('количество ядер', os.cpus());

// Работа с cluster
// 1. проверить является ли текущий процесс главным - cluster.isMaster
// 2. для каждого ядра запускам процесс - cluster.fork()
// 3. подписка на событие - cluster.on(...)

if (cluster.isMaster) {
    const cpus = os.cpus();
    for (let i = 0; i < cpus.length - 2; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`<<< !!! Worker pid:${worker.process.pid} has been stopped !!! >>>`);
        cluster.fork();
    });
} else {
    console.log(`Worker pid:${process.pid} has been started!`);

    setInterval(() => {
        console.log(`Worker pid:${process.pid} is still working!`);
    }, 5000);
}

// масштабирование node.js
// 1. балансировка
// 2. кластеризация
// 3. докер контейнеры