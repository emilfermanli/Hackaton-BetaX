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


    // const [celce, setCelce] = useState(0)

    useEffect(() => {
        socket.onopen = () => {
            console.log("connected to websocket")
        }
        socket.onmessage = (event) => {
            console.log(event)
        }

        socket.onerror = (error) => {
            console.log(error)
        }

        axios.get(`http://64.227.107.166/api`)
            .then(res => {
                const persons = res.data;
                console.log(persons.data)
                console.log(res)
            })

        return () => {
            socket.onclose = () => {
                console.log('disconnected')
            }
        }
    }, [mss])



    // 

    return (
        <div>
            <PageOne />
        </div>
    )
}

export default App
