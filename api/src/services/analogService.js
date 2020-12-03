const { Sensor } = require('johnny-five')

const A0 = new Sensor("A0")
const A1 = new Sensor("A1")
const A2 = new Sensor("A2")

let values = [[], [], []]

const add = (index, sensor) => {
	values[index].push({
		value: sensor.scaleTo([0, 255]),
		timestamp: Date.now()
	})
}

A0.on("data", () => add(0, A0))
A1.on("data", () => add(1, A1))
A2.on("data", () => add(2, A2))

exports.getLast = (pin) => {
	if(values[pin][values[pin].length-1])
		return values[pin][values[pin].length-1].value
}

exports.getSince = (pin, time) => values[pin].filter(e => e.timestamp > time)