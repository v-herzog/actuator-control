const PID = require('pid-controller');

const analogService = require('../services/analogService')
const pwmService = require('../services/pwmService')

const
    Kp = 100,
    Ki = 0,
    Kd = 0

const pid = {
    direct: new PID(0, 0, Kp, Ki, Kd, PID.DIRECT),
    reverse: new PID(0, 0, Kp, Ki, Kd, PID.REVERSE),
    setPoint: 0,
    speed: 0,
    feedback: 0,
    delay: 100,
    enabled: 0,
    acceleration: 0,
    slowdown: 0,
    acceleration: 0.001,
    slowdown: 0.001,
    start_time: 0,
}

const loop = () => {
    pid.direct.setMode('auto')
    pid.reverse.setMode('auto')

    //pwmService.set(2, 255) // Válvula de pressão

    setInterval(() => {
        let newReading = analogService.getLast(0)

        pid.direct.setPoint(pid.setPoint)
        pid.direct.setInput(pid.feedback)
        pid.direct.compute()

        pid.reverse.setPoint(pid.setPoint)
        pid.reverse.setInput(pid.feedback)
        pid.reverse.compute()

        let control_speed = pid.speed

        // Cálculo velocidade em aceleração
        let diff_time = (Date.now() - pid.start_time) / pid.acceleration
        let accel_speed = diff_time * pid.speed

        if (diff_time > 0 && diff_time < 1) control_speed = accel_speed

        // Cálculo velocidade em desaceleração
        let time_until_stop = (newReading - pid.setPoint) / pid.speed * 1000
        diff_time = time_until_stop / pid.slowdown
        let slwdwn_speed = diff_time * pid.speed

        if (diff_time > 0 && diff_time < 1) control_speed = slwdwn_speed

        let forward = Math.min(pid.direct.getOutput(), control_speed)
        let reverse = Math.min(pid.reverse.getOutput(), control_speed)
        // fazer interpolação

        console.log(`PID  enb: ${pid.enabled ? 1 : 0}  pos_obj: ${pid.setPoint}  spe_obj: ${pid.speed} acc_obj: ${pid.acceleration}  slo_obj: ${pid.slowdown}  pos_in: ${pid.feedback}  fwd_out: ${forward}  rev_out: ${reverse}`)

        if (pid.enabled) {
            //pwmService.set(0, forward)
            //pwmService.set(1, reverse)
        }

        pid.feedback = newReading

    }, pid.delay)
}

loop()

exports.setPosition = async (value) => pid.setPoint = value
exports.setSpeed = async (value) => pid.speed = value
exports.setAcceleration = async (value) => pid.acceleration = value
exports.setSlowdown = async (value) => pid.slowdown = value
exports.setEnabled = async (value) => {
    pid.enabled = value
    if(value) pid.start_time = Date.now()
}