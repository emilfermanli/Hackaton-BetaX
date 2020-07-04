import React, { useEffect, useState } from 'react'
import { socket } from "./Components/socket"
import axios from "axios"
import PageOne from './Components/PageOne'

function App() {


    const [data, setData] = useState(
        {
            AirTemperature: 0,
            Alkaline: 0,
            Ammonia: 0,
            AmmoniumIon: 0,
            BiochemicalOxygenDemand: 0,
            Blurring: 0,
            ChemicalOxygenDemand: 0,
            Chlorophyll: 0,
            ClientId: 0,
            Date: "",
            Fikosin: 0,
            FlowRate: 0,
            HardnessOfTheWater: 0,
            Nitrate: 0,
            Nitrite: 0,
            NitrogenDioxide: 0,
            No3: 0,
            OwnerId: "",
            SalinityOfWater: 0,
            Sodium: 0,
            Sulfate: 0,
            SuspendedSolids: 0,
            WaterAcidity: 0,
            WaterLevel: 0,
            WaterOxygen: 0,
            WaterPermeability: 0,
            WaterTemperature: 0,
        }
    )


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
