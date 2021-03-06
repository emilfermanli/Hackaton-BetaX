import React, { useState } from 'react'

import { Container, Row, Col } from "reactstrap"
import ApexChart from "./Chart"
import DataChart from "./ChartData"
import Circle from 'react-circle'


function PageOne(props) {

    const { data } = props
    const d = new Date()

    let date = {
        year: d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + "6",
        watch: d.getHours() + ":" + d.getMinutes()
    }
    const [state] = useState([date])



    return (
        <div>
            <div className="header text-white">
                <div className="d-flex h-100 align-items-center justify-content-evenly">
                    <h5>BetaX</h5>
                </div>
            </div>
            <Container fluid={true}>
                <Row className="pt-3">
                    <Col lg={10}>
                        <div className=" pt-3">
                            <div className="box">
                                <Row >
                                    <Col lg={7} sm={12} md={12} xs={12}>
                                        <div className="big-box">
                                            <DataChart data={data} />
                                        </div>
                                    </Col>
                                    <Col lg={5} sm={12} md={12} xs={12} className="pl-0">
                                        <div className="big-box">
                                            <div className="big-header ">
                                                <h6>Suyun kimyəvi tərkibi</h6>
                                            </div>
                                            <ApexChart data={data} />
                                        </div>
                                    </Col>
                                    <Col lg={7}>
                                        <div className="big-box big-box-2 w-100">
                                            <Row className="justify-content-around p-2">
                                                <Col lg={3} className="text-center">
                                                    <Circle
                                                        animate={true}
                                                        animationDuration="1s"
                                                        responsive={true}
                                                        progress={data === null ? 0 : data.WaterAcidity}
                                                        size={15}
                                                        progressColor="#9bdeac"
                                                        showPercentageSymbol={false}
                                                    />

                                                    <h6>Suyun turşuluğu (pH)</h6>
                                                </Col>
                                                <Col lg={3} className="text-center">
                                                    <Circle
                                                        animate={true}
                                                        animationDuration="1s"
                                                        responsive={true}
                                                        progress={data === null ? 0 : data.SalinityOfWater}
                                                        showPercentageSymbol={false}
                                                    />
                                                    <h6>Suyun duzluluğu (mg/l)</h6>
                                                </Col>
                                                <Col lg={3} className="text-center">
                                                    <Circle
                                                        animate={true}
                                                        animationDuration="1s"
                                                        responsive={true}
                                                        progress={data === null ? 0 : data.FlowRate}
                                                        progressColor="#d92027"
                                                        showPercentageSymbol={false}
                                                    />

                                                    <h6>Suyun temperaturu - (C)</h6>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col lg={5} className="pl-0">
                                        <Row>
                                            <Col lg={12}>

                                                <div className="big-box big-box-2">
                                                    <div className="big-header ">
                                                        <h6>Suyun yararlılığı haqqında məlumat</h6>
                                                    </div>
                                                    <div className="pl-4 pr-4">
                                                        <p className="m-0">Suyun keyfiyyətini bilmək bizə ilk öncə onun nəyə yararlı olması haqqında məlumat verir.  Suyun keyfiyyətini bilib biz onun suvarma üçün yaxud da içməyə yararlı ya da yararsız olmasını bilə bilərik. Məsələn  şor su suvarma üçün  eyni zamanda da içmək üçün yararsız hesab olunur. Tərkibində az yod olan, çirkli, zərərli bakteriyalar olan, axımı olmayan su içmək üçün yararsız hesab olunur.</p>
                                                        <div className="alert mt-1 text-center text-white">
                                                            <h6>Su içmək üçün yararlıdır!</h6>
                                                        </div>
                                                    </div>

                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>

                        </div>
                    </Col>
                    <Col lg={2} style={{ height: "auto" }} className="mb-2 bg-white big-box mt-3">
                        <div className="big-header pl-0 pr-0 pt-2 pb-2">
                            <h6>Cihazın yerləşmə nöqtəsi</h6>
                        </div>
                        <div style={{ height: "150px" }} className="map w-100">
                            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.4463740276674!2d49.920235515399455!3d40.53172637935183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDMxJzU0LjIiTiA0OcKwNTUnMjAuNyJF!5e0!3m2!1sen!2s!4v1593886057478!5m2!1sen!2s" frameBorder="0" style={{ width: "100%", height: "100%", border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                        </div>
                        <ul className="list-ul">
                            {
                                data === null ? "" : <li className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <div>{state[0].year}</div>
                                        <div>{state[0].watch}</div>
                                    </div>
                                    <div>
                                        <svg fill="#0166ff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 6v8h7v-2h-5v-6h-2zm10.854 7.683l1.998.159c-.132.854-.351 1.676-.652 2.46l-1.8-.905c.2-.551.353-1.123.454-1.714zm-2.548 7.826l-1.413-1.443c-.486.356-1.006.668-1.555.933l.669 1.899c.821-.377 1.591-.844 2.299-1.389zm1.226-4.309c-.335.546-.719 1.057-1.149 1.528l1.404 1.433c.583-.627 1.099-1.316 1.539-2.058l-1.794-.903zm-20.532-5.2c0 6.627 5.375 12 12.004 12 1.081 0 2.124-.156 3.12-.424l-.665-1.894c-.787.2-1.607.318-2.455.318-5.516 0-10.003-4.486-10.003-10s4.487-10 10.003-10c2.235 0 4.293.744 5.959 1.989l-2.05 2.049 7.015 1.354-1.355-7.013-2.184 2.183c-2.036-1.598-4.595-2.562-7.385-2.562-6.629 0-12.004 5.373-12.004 12zm23.773-2.359h-2.076c.163.661.261 1.344.288 2.047l2.015.161c-.01-.755-.085-1.494-.227-2.208z" /></svg>
                                    </div>
                                </li>

                            }
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PageOne
