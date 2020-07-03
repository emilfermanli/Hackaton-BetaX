import React, { useEffect, useState } from 'react'
import { socket } from "./Components/socket"
import axios from "axios"

function App() {


    const [mss] = useState({
        Message: "hi there"
    })

    useEffect(() => {
        socket.onopen = () => {
            console.log(`connected`)
        }
        socket.onmessage = (event) => {
            socket.send({ "Message": "hi there" })
            socket.send(JSON.stringify(mss))
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

    return (
        <div>

        </div>
    )
}

export default App
