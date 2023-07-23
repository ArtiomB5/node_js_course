const Emitter = require('events');

const emitter = new Emitter();

// подписка на событие
emitter.on('message', (data, second, third) => {
    console.log('You have been sent a message: ' + data);
    console.log('The second argument: '  + second);
    console.log('The third argument: '  + third);
});

emitter.emit('message', '121212112', 123)

