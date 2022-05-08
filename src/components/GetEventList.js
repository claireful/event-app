import React, { useState, useEffect } from "react";
import axios from "axios";
import ModifyName from "./ModifyName";


const GetEventList = ({sendingCount, setSendingCount, getToken, setEventList, eventList}) => {


  async function deleteEvent(id){
    const token = await getToken();
    let response_events = await axios.delete(`https://api.dev.eventdrive.com/public/v1/events/${id}`,
      { "headers": {
        'Authorization': `Bearer ${await token}`
      }});
    setSendingCount(sendingCount + 1);
  };

  async function fetchEventList() {
    const token = await getToken();
    let response_events = await axios.get("https://api.dev.eventdrive.com/public/v1/events",
      { "headers": {
        'Authorization': `Bearer ${await token}`
      }});
    setEventList(response_events.data.items);
  };

  useEffect (() => {
    fetchEventList();
  }, [sendingCount]);

  return(
    <div className="all-events">
      {eventList.map((element) =>
        <div key={element.id} className="single-event">
          <div className="event-items">
            <div className="event-name">{element.name.en}</div>
            <div className="event-description">{element.description.en}</div>
            <div>Du {element.start_date} au {element.end_date}</div>
            <div className="modify-delete-event">
              <ModifyName id={element.id} eventJson={element} getToken={getToken} setSendingCount={setSendingCount} sendingCount={sendingCount}></ModifyName>
              <button className="delete-event-button" onClick={(event) => {deleteEvent(element.id);}}>Supprimer l'événement</button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default GetEventList;
