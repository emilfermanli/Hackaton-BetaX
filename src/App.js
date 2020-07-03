import React, { useEffect, useState } from 'react'
import { socket } from "./Components/socket"
import axios from "axios"
import { Container, Col, Table, Row } from "reactstrap"
import Thermometer from 'react-thermometer-component'

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

    setTimeout(function () { setCelce(45) }, 3000);

    const [celce, setCelce] = useState(0)

    return (
        <div>
            <Container fluid={true}>
                <Col lg={12} className="text-center mt-3 mb-4">
                    <h1 className="text-white">BetaX</h1>
                </Col>
                <Row>
                    <Col lg={6}>
                        <div id="status-table">
                            <Table>
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
                            <Thermometer
                                theme="light"
                                value={celce}
                                max="100"
                                steps="3"
                                format="°C"
                                size="large"
                                height="250"
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App
