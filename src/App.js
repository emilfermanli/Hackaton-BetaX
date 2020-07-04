import React, { useEffect, useState } from 'react'
import { socket } from "./Components/socket"
import axios from "axios"
import PageOne from './Components/PageOne'

function App() {


    const [data, setData] = useState()


    useEffect(() => {
        socket.onopen = () => {
            console.log("connected to websocket")
        }
        socket.onmessage = (event) => {
            setData(JSON.parse(event.data))
        }

        socket.onerror = (error) => {
            console.log(error)
        }

        axios.get(`http://64.227.107.166/data`)
            .then(res => {
                const persons = res.data;

            })

        return () => {
            socket.onclose = () => {
                console.log('disconnected')
            }
        }
    }, [data])

    return (
        <div>
            <PageOne data={data} />
        </div>
    )
}

export default App
