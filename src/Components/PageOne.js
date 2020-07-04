import React from 'react'
import logo from "../assets/images/logo-w.svg"
import { Container, Row, Col } from "reactstrap"
import ApexChart from "./Chart"
import DataChart from "./ChartData"
import Circle from 'react-circle'


function PageOne({ data }) {
    return (
        <div>
            <div className="header d-flex align-items-center text-white">
                <Container fluid={true}>
                    <img src={logo} height="30" alt="logo" />
                </Container>
            </div>
            <Container fluid={true}>
                <Row className="pt-3">
                    <Col lg={10}>
                        <div className="big-box pt-3">
                            <div className="box">
                                <Row >
                                    <Col lg={7} sm={12} md={12} xs={12}>
                                        <DataChart data={data} />
                                    </Col>
                                    <Col lg={5} sm={12} md={12} xs={12}>
                                        <ApexChart data={data} />
                                    </Col>
                                    <Col lg={12}>
                                        <Row className="pl-2 pr-2">
                                            <Col lg={2} className="text-center">
                                                <Circle
                                                    animate={true}
                                                    animationDuration="1s"
                                                    responsive={true}
                                                    progress={30}
                                                    size={15}
                                                    progressColor="#9bdeac"
                                                    showPercentageSymbol={false}
                                                />
                                                {/* data.WaterAcidity ? data.WaterAcidity : 0 */}
                                                <h6>Suyun turşuluğu (pH)</h6>
                                            </Col>
                                            <Col lg={2} className="text-center">
                                                <Circle
                                                    animate={true}
                                                    animationDuration="1s"
                                                    responsive={true}
                                                    progress={data.SalinityOfWater ? data.SalinityOfWater : 0}
                                                    showPercentageSymbol={false}
                                                />
                                                <h6>Suyun duzluluğu</h6>
                                            </Col>
                                            <Col lg={2} className="text-center">
                                                <Circle
                                                    animate={true}
                                                    animationDuration="1s"
                                                    responsive={true}
                                                    progress={data.WaterTemperature ? data.WaterTemperature : 0}
                                                    progressColor="#d92027"
                                                    showPercentageSymbol={false}
                                                />
                                                <h6>Suyun temperaturu</h6>
                                            </Col>
                                            <Col lg={6}>
                                                <div className="p-3">
                                                    Suyun neye yararliligi haqda melumatin oldugu yer
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>

                        </div>
                    </Col>
                    <Col lg={2} className="mb-2">
                        <h5>Cihazın yerləşmə nöqtəsi</h5>
                        <div style={{ height: "150px" }} className="map w-100">
                            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.4463740276674!2d49.920235515399455!3d40.53172637935183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMxJzU0LjIiTiA0OcKwNTUnMjAuNyJF!5e0!3m2!1sen!2s!4v1593886057478!5m2!1sen!2s" frameBorder="0" style={{ width: "100%", height: "100%", border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                        </div>
                        <ul className="list-ul">
                            <li className="d-flex align-items-center justify-content-between">
                                <div>
                                    <div>2020-07-06</div>
                                    <div>05:30</div>
                                </div>
                                <div>
                                    <svg fill="#0166ff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 6v8h7v-2h-5v-6h-2zm10.854 7.683l1.998.159c-.132.854-.351 1.676-.652 2.46l-1.8-.905c.2-.551.353-1.123.454-1.714zm-2.548 7.826l-1.413-1.443c-.486.356-1.006.668-1.555.933l.669 1.899c.821-.377 1.591-.844 2.299-1.389zm1.226-4.309c-.335.546-.719 1.057-1.149 1.528l1.404 1.433c.583-.627 1.099-1.316 1.539-2.058l-1.794-.903zm-20.532-5.2c0 6.627 5.375 12 12.004 12 1.081 0 2.124-.156 3.12-.424l-.665-1.894c-.787.2-1.607.318-2.455.318-5.516 0-10.003-4.486-10.003-10s4.487-10 10.003-10c2.235 0 4.293.744 5.959 1.989l-2.05 2.049 7.015 1.354-1.355-7.013-2.184 2.183c-2.036-1.598-4.595-2.562-7.385-2.562-6.629 0-12.004 5.373-12.004 12zm23.773-2.359h-2.076c.163.661.261 1.344.288 2.047l2.015.161c-.01-.755-.085-1.494-.227-2.208z" /></svg>
                                </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                                <div>
                                    <div>2020-07-06</div>
                                    <div>11:23</div>
                                </div>
                                <div>
                                    <svg fill="#0166ff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 6v8h7v-2h-5v-6h-2zm10.854 7.683l1.998.159c-.132.854-.351 1.676-.652 2.46l-1.8-.905c.2-.551.353-1.123.454-1.714zm-2.548 7.826l-1.413-1.443c-.486.356-1.006.668-1.555.933l.669 1.899c.821-.377 1.591-.844 2.299-1.389zm1.226-4.309c-.335.546-.719 1.057-1.149 1.528l1.404 1.433c.583-.627 1.099-1.316 1.539-2.058l-1.794-.903zm-20.532-5.2c0 6.627 5.375 12 12.004 12 1.081 0 2.124-.156 3.12-.424l-.665-1.894c-.787.2-1.607.318-2.455.318-5.516 0-10.003-4.486-10.003-10s4.487-10 10.003-10c2.235 0 4.293.744 5.959 1.989l-2.05 2.049 7.015 1.354-1.355-7.013-2.184 2.183c-2.036-1.598-4.595-2.562-7.385-2.562-6.629 0-12.004 5.373-12.004 12zm23.773-2.359h-2.076c.163.661.261 1.344.288 2.047l2.015.161c-.01-.755-.085-1.494-.227-2.208z" /></svg>
                                </div>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                                <div>
                                    <div>2020-04-03</div>
                                    <div>02:10</div>
                                </div>
                                <div>
                                    <svg fill="#0166ff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 6v8h7v-2h-5v-6h-2zm10.854 7.683l1.998.159c-.132.854-.351 1.676-.652 2.46l-1.8-.905c.2-.551.353-1.123.454-1.714zm-2.548 7.826l-1.413-1.443c-.486.356-1.006.668-1.555.933l.669 1.899c.821-.377 1.591-.844 2.299-1.389zm1.226-4.309c-.335.546-.719 1.057-1.149 1.528l1.404 1.433c.583-.627 1.099-1.316 1.539-2.058l-1.794-.903zm-20.532-5.2c0 6.627 5.375 12 12.004 12 1.081 0 2.124-.156 3.12-.424l-.665-1.894c-.787.2-1.607.318-2.455.318-5.516 0-10.003-4.486-10.003-10s4.487-10 10.003-10c2.235 0 4.293.744 5.959 1.989l-2.05 2.049 7.015 1.354-1.355-7.013-2.184 2.183c-2.036-1.598-4.595-2.562-7.385-2.562-6.629 0-12.004 5.373-12.004 12zm23.773-2.359h-2.076c.163.661.261 1.344.288 2.047l2.015.161c-.01-.755-.085-1.494-.227-2.208z" /></svg>
                                </div>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PageOne
