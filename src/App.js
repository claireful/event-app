import React, { useState } from "react";
import CreateEvent from "./components/CreateEvent";
import GetEventList from "./components/GetEventList";
import axios from "axios";
import "./style.css";

const App = () => {

    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [eventList, setEventList] = useState([]);
    const [sendingCount, setSendingCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);


    async function getToken(){
      let response_token = await axios.post("https://api.dev.eventdrive.com/public/v1/token",
      {
        "client_id": "25",
        "client_secret":"FgR7rnRi9AWe3Y0sgrQhLLJKEA0PQQJxdoyKqSxH"
      });
      return await response_token.data.access_token;
    };

    return (
      <div className="back">
        <h1>Mes événements</h1>
        <div className="main-div">
          <div className="event-list">
            <GetEventList getToken={getToken} sendingCount={sendingCount} setSendingCount={setSendingCount} eventList={eventList} setEventList={setEventList}/>
          </div>
          <div className="create-event">
            <button className="add-button" onClick={() => {setIsOpen(true)}}>Ajouter un événement</button>
            <CreateEvent isOpen={isOpen} setIsOpen={setIsOpen} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} getToken={getToken} sendingCount={sendingCount} setSendingCount={setSendingCount} setEventName={setEventName} setEventDescription={setEventDescription} eventName={eventName} eventDescription={eventDescription}/>
          </div>
        </div>
      </div>
    );
};

export default App;
