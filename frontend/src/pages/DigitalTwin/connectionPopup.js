import { Popup } from "../../components/Popup"
import { useState } from 'react'

export const ConnectionPopup = ({ connection, setConnection,setShowModel }) => {

    const [details, setDetails] = useState({
        protocol: 'ws',
        clientId: 'vir-pth-A1-B2-C3-D4-E5-F6',
        username: 'axLBthbazeJkKKkpr2sVK9rAeXfFJGmH1V9k18iqaSyKqHYHzetadIyitBL15WyU',
        password: '',
        name: 'MQTT',
        host: 'mqtt.flespi.io',
        port: '1883'
    })

    const handleConnectionCheck = async () => {
        setShowModel(true)
    }

    const handleChange = ({ target: { name, value } }) => {
        let updatedData = { ...details };
        updatedData[name] = value;
        setDetails(updatedData);
    };
    return (
        <div>
            <Popup {...{
                showModal: connection,
                setShowModal: setConnection,
                fixedTitle: 'MQTT Connection',
                footer:false,
                size:'xs'
            }}>
                <div>
                    <div className="input-group">
                        <label htmlFor="connection-name">Connection Name</label>
                        <input type="text" id="connection-name" name='name' onChange={handleChange} value={details.name} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="database-name">Protocol</label>
                        <input type="text" id="database-name" onChange={handleChange} name='protocol' value={details.protocol} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="hostname">Hostname / IP Address</label>
                        <input type="text" id="hostname" onChange={handleChange} name='host' value={details.host} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="hostname">Port</label>
                        <input type="text" id="hostname" onChange={handleChange} name='port' value={details.port} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="hostname">Hostname / IP Address</label>
                        <input type="text" id="hostname" onChange={handleChange} name='host' value={details.host} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="hostname">UserName</label>
                        <input type="text" id="hostname" onChange={handleChange} name='username' value={details.username} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="hostname">Password</label>
                        <input type="text" id="hostname" onChange={handleChange} name='password' value={details.password} />
                    </div>

                    <div className='d-flex' style={{ gap: '5px' }}>
                        <button className='btn btn-primary w-100' onClick={() => handleConnectionCheck()}>Connect</button>
                    </div>
                </div>
            </Popup>
        </div>
    )
}