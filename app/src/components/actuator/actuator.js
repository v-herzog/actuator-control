import React, { useState } from 'react';
import { Panel, Slider, Divider, Toggle, Progress, InputNumber, Grid, Row, Col } from 'rsuite';
import { Linechart } from '../linechart/linechart';
import { useInterval } from './useInterval'
import axios from 'axios'

import './actuator.css';

export const Actuator = ({ name }) => {

    const { Line } = Progress

    const url = 'http://localhost:5000/actuator'

    const [position, setPosition] = useState(0)
    const [speed, setSpeed] = useState(-1)
    const [timestamp, setTimestamp] = useState(0)
    const [history, setHistory] = useState([])
    const [y, setY] = useState([])
    const [x, setX] = useState([])

    const post = (action, value) => axios.post(`${url}/${action}/${value * 2.55}`)

    useInterval(() => {
        let pin = 0

        axios.get(`${url}/${pin}/${timestamp}`).then(response => {
            let data = response.data
            let newPosition = (data[data.length - 1].value / 2.55)

            setSpeed(speed < 0 ? 0 : Math.abs((position - newPosition) / 0.5))
            setPosition(newPosition)
            setTimestamp(data[data.length - 1].timestamp)

            let newY = y
            data.map((e, i) => newY.push({
                position: parseInt(e.value / 2.55),
                speed: parseInt(speed),
                timestamp: e.timestamp
            }))
            setY(newY.slice(-2000))

            let newX = x
            data.map(e => newX.push(e.timestamp))
            setX(newX)

            let sliced = newX.slice(-2000)
            let newHistory = []

            if (sliced.length === 2000) {
                for (let i = 1; i <= 2000; i += 200) {
                    newHistory.push(`${new Date(sliced[i]).toISOString().slice(14, 19)}`)
                }
                setHistory(newHistory)
            }
        })
    }, 500);

    return (
        <Panel header={name} bordered>

            <div className='right'>
                <Toggle size="lg" onChange={checked => post('enabled', checked)}/>
            </div>

            <div className='yellow'>
                <span>Posicao</span>
                <Slider
                    progress
                    defaultValue={0}
                    onChange={value => post('position', value)}
                />
                <br />
                <span>Posicao atual: {parseInt(position) * 2}mm ( {position.toFixed(2)}% )</span>
                <Line percent={position} showInfo={false} strokeColor="#dba709" />

                <Divider />
            </div>

            <div className='blue'>
                <span>Velocidade maxima</span>
                <Slider
                    progress
                    defaultValue={0}
                    onChange={value => post('speed', value)}
                />
                <br/>
                <span>Velocidade atual: {parseInt(speed) * 2}mm/s ( {speed.toFixed(2)}% )</span>
                <Line percent={speed} showInfo={false}/>

                <Divider />
            </div>

            <Grid fluid>
                <Row>
                    <Col sm={8} xs={12}>
                        <span>Aceleracao (ms)</span>
                        <InputNumber
                            step={100}
                            min={0}
                            onChange={value => post('acceleration', value)}
                        />
                    </Col>
                    <Col sm={8} xs={12}>
                        <span>Desaceleracao (ms)</span>
                        <InputNumber
                            step={100}
                            min={0}
                            onChange={value => post('slowdown', value)}
                        />
                    </Col>
                </Row>
            </Grid>
            
            <Divider />

            <Linechart y={[
                { name: "Posicao", data: y.map(e => e.position) },
                { name: "Velocidade", data: y.map(e => e.speed) }
            ]}></Linechart>

            <div className="xAxis">
                {history.map((e, i) =>
                    e !== 'NaN.NaN' && <span key={i}>{e}</span>
                )}
            </div>
        </Panel>
    )
}