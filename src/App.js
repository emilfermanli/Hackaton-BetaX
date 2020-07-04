import React, { useEffect, useState } from 'react'
import { socket } from "./Components/socket"
import axios from "axios"
import { Container, Col, Table, Row } from "reactstrap"
import Thermometer from 'react-thermometer-component'
import DonutChart from 'react-donut-chart';


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
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
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
                                <Col lg={4}>
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
                                <Col lg={8}>
                                    <DonutChart
                                        height="300"
                                        width="350"
                                        data={[{
                                            label: 'Suyun çirkliliyi',
                                            value: 25,
                                        },
                                        {
                                            label: 'Suyun turşuluğu (pH)',
                                            value: 30,
                                        },
                                        {
                                            label: 'Suyun duzluluğu ',
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
                                            label: 'NO3  mg/l',
                                            value: 20,
                                        },
                                        {
                                            label: 'Sulfat',
                                            value: 20,
                                        },

                                        {
                                            label: '',
                                            value: 75,
                                        }]} />
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
