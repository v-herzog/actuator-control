const analogService = require('../services/analogService')
const controlService = require('../services/controlService')

exports.get = (req, res) => {
    let pin = parseInt(req.params.pin)
    let time = parseInt(req.params.time)

    let value = analogService.getSince(pin, time)

    res.status(200).send(value)
}

exports.postPosition = (req, res) => {
    let value = parseInt(req.params.value)

    controlService.setPosition(value)

    res.status(200).send(`${value}`)
}

exports.postSpeed = (req, res) => {
    let value = parseInt(req.params.value)

    controlService.setSpeed(value)

    res.status(200).send(`${value}`)
}

exports.postEnabled = (req, res) => {
    let value = parseInt(req.params.value)

    controlService.setEnabled(value)

    res.status(200).send(`${value}`)
}

exports.postAcceleration = (req, res) => {
    let value = parseInt(req.params.value / 2.55)

    controlService.setAcceleration(value)

    res.status(200).send(`${value}`)
}

exports.postSlowdown = (req, res) => {
    let value = parseInt(req.params.value / 2.55)

    controlService.setSlowdown(value)

    res.status(200).send(`${value}`)
}