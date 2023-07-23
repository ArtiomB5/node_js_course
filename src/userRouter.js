const Router = require('../framework/Router');

const router = new Router();

const users = [
    {id: 1, name: 'qqqq'},
    {id: 2, name: 'www'},
]

router.get('/users', (req, res) => {
    res.send(users);
})

router.post('/users', (req, res) => {
    console.log('req', req);
    res.send();
})

module.exports = router;