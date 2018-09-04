require('dotenv').config();

var app = require('./app')
var port = process.env.PORT || 3000

var server = app.listen(port, () => {
    console.log(`server listening at port ${port}`)
})

var Test = require('./models/Test')

app.get('/api/test/get', (req, res, next) => {
    Test.getTest().then(data => {
        res.status(200)
            .json({
                status: 'success',
                data: data,
                message: 'Get Test'
            })
    }).catch(err => {
        return next(err)
    })
})
