import React, { useEffect, useState } from 'react'
import { socket } from "./Components/socket"
import axios from "axios"
import { Container, Col, Table, Row } from "reactstrap"
import Thermometer from 'react-thermometer-component'
import DonutChart from 'react-donut-chart';
import ReactStoreIndicator from 'react-score-indicator'

function App() {

    const [mss] = useState({
        Message: "hi there"
    })

    useEffect(() => {
        // socket.onopen = () => {
        //     console.log(`connected`)
        // }
        // socket.onmessage = (event) => {
        //     socket.send({ "Message": "hi there" })
        //     socket.send(JSON.stringify(mss))
        // }

        // socket.onerror = (error) => {
        //     console.log(error)
        // }

        // axios.get(`http://64.227.107.166/api`)
        //     .then(res => {
        //         const persons = res.data;
        //         console.log(persons)
        //         console.log(res)
        //     })

        // return () => {
        //     socket.onclose = () => {
        //         console.log('disconnected')
        //     }
        // }
    }, [mss])

    const [celce, setCelce] = useState(0)

    setTimeout(function () { setCelce(99) }, 3000);

    return (
        <div>
            <Container fluid={true}>
                <Col lg={12} className="text-center mt-3 mb-4">
                    <h1 className="text-white">BetaX</h1>
                </Col>
                <Row>
                    <Col lg={6}>
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
                                <h4 className="mb-5">Water Status</h4>
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
                    <Col lg={6}>
                        <div id="status-table">
                            Suyun yararlılığı
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className="thermometr">
                            <Col lg={12}>
                                <h4 className="mb-5">Water Status</h4>
                            </Col>
                            <Row>
                                <Col lg={6}>
                                    <ReactStoreIndicator
                                        value={30}
                                        maxValue={100}
                                    />
                                </Col>
                                <Col lg={6}>
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
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App
