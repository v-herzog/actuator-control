const { Board } = require('johnny-five')
const board = new Board({ port: 'COM4' })

function normalizaPort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port
    }
    return false
}

board.on('ready', () => {
    const app = require('../src/app')
    const port = normalizaPort(process.env.PORT || '5000')

    app.listen(port, function () {
        console.log(`API listening on port ${port}`)
    })
})