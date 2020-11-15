import React from "react";
import Chart from "react-apexcharts";

import './linechart.css';

export const Linechart = ({ y }) => {

    const getOptions = () => {
        return {
            chart: {
                zoom: {
                    enabled: false
                },
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
                background: 'none'
            },
            theme: {
                mode: 'dark'
            },
            stroke: {
                width: 3,
                colors: ['#ffc107', '#34c3ff'],
            },
            xaxis: {
                labels: {
                    show: false
                },
            },
            yaxis: {
                min: 0,
                max: 100
            },
            tooltip: {
                enabled: false
            },
            legend: {
                show: false
            }
        }
    }

    return (
        <Chart
            options={getOptions()}
            series={y}
            type="line"
            width="500"
        />
    );
}