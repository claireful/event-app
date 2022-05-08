import react, { useState } from "react";
import axios from "axios";


const ModifyName = ({getToken, setSendingCount, sendingCount, id, eventJson}) => {

  const [newEventName, setNewEventName] = useState("");

  async function modifyEventName(id, eventJson){
    const token = await getToken();
    eventJson.name.en = newEventName;
    eventJson.external_id = id;
    let response_events = await axios.put(
      `https://api.dev.eventdrive.com/public/v1/events/${id}`,
      eventJson,
      { "headers": {
        'Authorization': `Bearer ${await token}`
      }});
    console.log("la reponse", response_events);
    setSendingCount(sendingCount + 1);
  };

  return (
    <div className="modify-name-box">
      <form action="" onSubmit={(event) => {
        event.preventDefault();
        modifyEventName(id, eventJson);
      }}>
        <input placeholder="nouveau nom..." value={newEventName} onChange={(event) => {setNewEventName(event.target.value);}}/>
        <button className="modify-button" type="submit">Modifier</button>
      </form>
    </div>
  )}

export default ModifyName;
