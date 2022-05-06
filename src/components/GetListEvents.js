import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import token from "./GetToken";

const GetListEvents = ({fetchEventList, setEventList, eventList}) => {

  const [newEventName, setNewEventName] = useState("");

  async function deleteEvent(id){
    let response_token = await axios.post("https://api.dev.eventdrive.com/public/v1/token",
      {
        "client_id": "25",
        "client_secret":"FgR7rnRi9AWe3Y0sgrQhLLJKEA0PQQJxdoyKqSxH"
      });
    let token = await response_token.data.access_token;
    let response_events = await axios.delete(`https://api.dev.eventdrive.com/public/v1/events/${id}`,
      { "headers": {
        'Authorization': `Bearer ${await token}`
      }});
  };

  async function modifyEventName(id, eventJson){
    console.log("je suis l'eveeeeent", eventJson);
    let response_token = await axios.post("https://api.dev.eventdrive.com/public/v1/token",
      {
        "client_id": "25",
        "client_secret":"FgR7rnRi9AWe3Y0sgrQhLLJKEA0PQQJxdoyKqSxH"
      });
    let token = await response_token.data.access_token;
    if ("en" in eventJson.name){
      eventJson.name.en = newEventName;
    } else if ("fr" in eventJson.name) {
      eventJson.name.fr = newEventName;
    };
    eventJson.external_id = id;
    let response_events = await axios.put(
      `https://api.dev.eventdrive.com/public/v1/events/${id}`,
      eventJson,
      { "headers": {
        'Authorization': `Bearer ${await token}`
      }});
    console.log(response_events);
  };

  useEffect (() => {
    setEventList(fetchEventList());
  }, []);

  return(
    <div>
      {console.log(eventList)}
      {eventList.map((element) =>
        <div key={element.id}>
          <h2>{element.name.en}</h2>
          <h2>{element.name.fr}</h2>
          <div>{element.description.fr}</div>
          <div>{element.description.en}</div>
          <div>{element.start_date}</div>
          <div>{element.end_date}</div>
          <div>{element.id}</div>
          <button onClick={(event) => {
            deleteEvent(element.id);
          }}>
            Supprimer l'événement
          </button>
          <form action="" onSubmit={(event) => {
            event.preventDefault();
            modifyEventName(element.id, element);
          }}>
            <input placeholder="nouveau nom..." value={newEventName} onChange={(event) => {setNewEventName(event.target.value);}}/>
            <button type="submit">Modifier le nom de l'événement</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default GetListEvents;
