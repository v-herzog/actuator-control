const { Led } = require('johnny-five')

const pwms = [
    new Led(9),
    new Led(10),
    new Led(11)
]

exports.set = (pin, value) => pwms[pin].brightness(value)