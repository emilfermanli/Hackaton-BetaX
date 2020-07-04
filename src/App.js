import React, { useEffect, useState } from 'react'
import { socket } from "./Components/socket"
import axios from "axios"
// import { Container, Col, Table, Row } from "reactstrap"
// import Thermometer from 'react-thermometer-component'
// import DonutChart from 'react-donut-chart';
// import ReactStoreIndicator from 'react-score-indicator'
import PageOne from './Components/PageOne'

function App() {

    const [mss] = useState({
        Message: "hi there"
    })

    useEffect(() => {
        socket.onopen = () => {
            socket.send(JSON.stringify(mss))
            console.log("send -->" + JSON.stringify(mss))

        }
        socket.onmessage = (event) => {
            console.log(event)
            console.log("received -->" + event)
        }

        socket.onerror = (error) => {
            console.log(error)
        }

        axios.get(`http://64.227.107.166/api`)
            .then(res => {
                const persons = res.data;
                console.log(persons)
                console.log(res)
            })

        return () => {
            socket.onclose = () => {
                console.log('disconnected')
            }
        }
    }, [mss])

    const [celce, setCelce] = useState(0)

    setTimeout(function () { setCelce(99) }, 3000);

    return (
        <div>
            <PageOne />
            {/* <Container fluid={true}>
                <Col lg={12} className="text-center mt-3 mb-4">
                    <h1 className="text-dark">BetaX</h1>
                </Col>
                <Row>
                    <Col lg={6}>
                        <div>
                            asd
                        </div>
                        <div id="status-table">
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Tarix</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>2020-07-6-05:30</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="thermometr">
                            <Col lg={12}>
                                <h4 className="mb-5">Suyun Tərkibi</h4>
                            </Col>
                            <Row>
                                <Col lg={12}>
                                    <DonutChart
                                        height={300}
                                        width={400}
                                        data={[{
                                            label: 'Çirkliliyi',
                                            value: 25,
                                        },
                                        {
                                            label: 'Turşuluğu ',
                                            value: 30,
                                        },
                                        {
                                            label: 'Duzluluğu ',
                                            value: 20,
                                        },
                                        {
                                            label: 'Sodium',
                                            value: 20,
                                        },
                                        {
                                            label: 'Alkalin',
                                            value: 20,
                                        },
                                        {
                                            label: 'NO3 mg/l',
                                            value: 20,
                                        },
                                        {
                                            label: 'Sulfat',
                                            value: 20,
                                        },
                                        {
                                            label: 'Bulanlıqlıq',
                                            value: 20,
                                        },
                                        {
                                            label: 'Xlorofil',
                                            value: 20,
                                        },
                                        {
                                            label: 'Fikosinin',
                                            value: 20,
                                        },
                                        {
                                            label: 'Ammonyak',
                                            value: 20,
                                        }
                                        ]}
                                        colors={['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#607d8b']}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col lg={12}>
                        <div className="thermometr">
                            <Row>
                                <Col lg={4} className="d-flex justify-content-center">
                                    <Col lg={12}>
                                        <div className="mb-5">
                                            <h4>İstifadəyə yararlılıq dərəcəsi</h4>
                                        </div>
                                        <ReactStoreIndicator
                                            value={celce}
                                            maxValue={100}
                                        />
                                    </Col>
                                </Col>
                                <Col lg={4} className="text-center">
                                    <h3>Su haqqımda</h3>
                                    <p>lorem ipsum dolor sit amet</p>
                                </Col>
                                <Col lg={4} >
                                    <Col lg={12} className="d-flex justify-content-center align-items-center flex-column">
                                        <div className="mb-5">
                                            <h4>Suyun Tempraturu</h4>
                                        </div>
                                        <Thermometer
                                            theme="light"
                                            value={celce}
                                            max="100"
                                            steps="3"
                                            format="°C"
                                            size="large"
                                            height="250"
                                        />
                                    </Col>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container> */}
        </div>
    )
}

export default App
