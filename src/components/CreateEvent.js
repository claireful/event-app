import React, { useState, useEffect } from "react";
import axios from "axios";


const CreateEvent = ({isOpen, setIsOpen, startDate, setStartDate, endDate, setEndDate, getToken, sendingCount, setSendingCount, setEventName, setEventDescription, eventName, eventDescription}) => {

  const [eventNameInputValue, setEventNameInputValue] = useState('');
  const [eventDescriptionInputValue, setEventDescriptionInputValue] = useState('');
  const [startDateInputValue, setStartDateInputValue] = useState('');
  const [endDateInputValue, setEndDateInputValue] = useState('');

  useEffect(() => {
    async function postEvent() {
      const token = await getToken();
      let response = await axios.post(
        "https://api.dev.eventdrive.com/public/v1/events",
        {
          "id": 15757,
          "external_id": null,
          "main_manager_id": 5962,
          "additional_manager_id": [],
          "is_template": false,
          "category_id": "",
          "category_ids": [],
          "name": {
            "en": eventName
          },
          "description": {
            "en": eventDescription
          },
          "visibility": "public",
          "status": "draft",
          "reference_id": null,
          "start_date": startDate,
          "end_date": endDate,
          "timezone": "UTC",
          "available_locales": [
            "en"
          ],
          "default_locale": "en",
          "venue": {
            "name": "",
            "address": "",
            "city": "",
            "postcode": "",
            "country_code": "",
            "latitude": "",
            "longitude": ""
          },
          "urls": {
            "admin": "https://admin.dev.eventdrive.com/events/15757/edit/infos",
            "website": "https://dev.evdr.co/rl1Hbw",
            "web_app": "https://app.dev.eventdrive.com/#/apps/0/events/15757/home"
          },
          "extra_fields": [],
          "website": {
            "design": {
              "background_image_url": null,
              "header_background_image_url": null
            }
          }
        },
        {
          "headers": {
          'Authorization': `Bearer ${await token}`
          }
        }
      );
      setSendingCount(sendingCount + 1);
    };
    if (eventName !== "" && eventDescription !== ""){
      postEvent();
      setEventDescriptionInputValue("");
      setEventNameInputValue("");
      setStartDateInputValue("");
      setEndDateInputValue("");
    }
  }, [eventName, eventDescription]);


  if (!isOpen) return;
  return(
    <div className="overlay">
      <div className="modal">
        <button className="close-button" onClick={() => {setIsOpen(false);}}>X</button>
        <form action="" onSubmit={(event) => {
          event.preventDefault();
          setEventName(eventNameInputValue);
          setEventDescription(eventDescriptionInputValue);
          setStartDate(startDateInputValue.split("T")[0] + " " + startDateInputValue.split("T")[1] + ":00");
          setEndDate(endDateInputValue.split("T")[0] + " " + endDateInputValue.split("T")[1] + ":00");
          setIsOpen(false);
        }}>
          <div>
            <label>Nom
              <input className="event-name" placeholder="nom de l'événement..." value={eventNameInputValue} onChange={(event) => setEventNameInputValue(event.target.value)}/>
            </label>
            <label>Date de début
            <input className="event-date" type="datetime-local" value={startDateInputValue} onChange={(event) => setStartDateInputValue(event.target.value)}/>
            </label>
            <label>Date de fin
              <input className="event-date" type="datetime-local" value={endDateInputValue} onChange={(event) => setEndDateInputValue(event.target.value)}/>
            </label>
            <label>Description
              <textarea rows="5" value={eventDescriptionInputValue} onChange={(event) => setEventDescriptionInputValue(event.target.value)}/>
            </label>
          </div>
          <div className="submit-button-box">
            <button className="submit-form-create-event-button" type="submit">Créer</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default CreateEvent;
