import React from "react"
import {
    CChart,
} from '@coreui/react-chartjs'


const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};

const bar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};

const doughnut = {
    labels: [
        'Red',
        'Green',
        'Yellow',
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ],
        }],
};

const radar = {
    labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55, 40],
        },
        {
            label: 'My Second dataset',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100],
        },
    ],
};

const pie = {
    labels: [
        'Red',
        'Green',
        'Yellow',
    ],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
            ],
        }],
};

const polar = {
    datasets: [
        {
            data: [
                11,
                16,
                7,
                3,
                14,
            ],
            backgroundColor: [
                '#FF6384',
                '#4BC0C0',
                '#FFCE56',
                '#E7E9ED',
                '#36A2EB',
            ],
            label: 'My dataset' // for legend
        }],
    labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Blue',
    ],
};

const options = {
    // tooltips: {
    //   enabled: false,
    //   custom: customTooltips
    // },
    maintainAspectRatio: false
}
class Mandatement extends React.Component{
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <h4>Line</h4>
                    <div className="chart-wrapper">
                        <CChart type="line" datasets={line.datasets} options={options} />
                    </div>
                    <hr />
                </div>
                <div className="col-md-6">
                    <h4>Bar</h4>
                    <div className="chart-wrapper">
                        <CChart type="bar" datasets={bar.datasets} options={options} labels="months"/>
                    </div>
                    <hr />
                </div>
                <div className="col-md-6">
                    <h4>Doughnut</h4>
                    <div className="chart-wrapper">
                        <CChart type="doughnut" datasets={doughnut.datasets} labels={doughnut.labels}/>
                    </div>
                    <hr />
                </div>
                <div className="col-md-6">
                    <h4>Radar</h4>
                    <div className="chart-wrapper">
                        <CChart type="radar" datasets={radar.datasets} labels={radar.labels}/>
                    </div>
                    <hr />
                </div>
                <div className="col-md-6">
                    <h4>Pie</h4>
                    <div className="chart-wrapper">
                        <CChart type="pie" datasets={pie.datasets} labels={pie.labels} />
                    </div>
                    <hr />
                </div>
                <div className="col-md-6">
                    <h4>Polar</h4>
                    <div className="chart-wrapper">
                        <CChart
                            type="polarArea"
                            datasets={polar.datasets}
                            options={{
                                maintainAspectRatio: true,
                                tooltips: {
                                    enabled: true
                                }
                            }}
                            labels={polar.labels}
                        />
                    </div>
                    <hr />
                </div>
            </div>
        )

    }
}

export default Mandatement