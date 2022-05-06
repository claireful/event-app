import React, { useState } from "react";
import CreateEvent from "./components/CreateEvent";
import GetListEvents from "./components/GetListEvents";


const App = () => {

    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventList, setEventList] = useState([]);
    const [isSending, setIsSending] = useState(false);

    return (
        <div>
          <h1>Créez votre événement</h1>
          <div>
            <CreateEvent isSending={isSending} setIsSending={setIsSending} setEventName={setEventName} setEventDescription={setEventDescription} eventName={eventName} eventDescription={eventDescription}/>
          </div>
          <div>
            <h1>Liste des événements</h1>
            <GetListEvents isSending={isSending} setIsSending={setIsSending} setEventName={setEventName} eventName={eventName} eventList={eventList} setEventList={setEventList}/>
          </div>
        </div>
    );
};

export default App;
