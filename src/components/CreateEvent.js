import React, { useState, useEffect } from "react";
import axios from "axios";


const CreateEvent = ({isSending, setIsSending, setEventName, setEventDescription, eventName, eventDescription}) => {

  const [eventNameInputValue, setEventNameInputValue] = useState('');
  const [eventDescriptionInputValue, setEventDescriptionInputValue] = useState('');

  useEffect(() => {
    async function postEvent() {
      let response_token = await axios.post("https://api.dev.eventdrive.com/public/v1/token",
      {
        "client_id": "25",
        "client_secret":"FgR7rnRi9AWe3Y0sgrQhLLJKEA0PQQJxdoyKqSxH"
      });
      let token = await response_token.data.access_token;
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
          "start_date": "2021-12-08 00:00:00",
          "end_date": "2021-12-23 00:00:00",
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
    };
    if (eventName != "" && eventDescription != ""){
      postEvent();
      setEventDescriptionInputValue("");
      setEventNameInputValue("");
    }
  }, [eventName, eventDescription]);

  return(
    <div>
      <form action="" onSubmit={(event) => {
        event.preventDefault();
        setEventName(eventNameInputValue);
        setEventDescription(eventDescriptionInputValue);
      }}>
        <div>
          <input placeholder="nom de l'événement..." value={eventNameInputValue} onChange={(event) => setEventNameInputValue(event.target.value)}/>
        </div>
        <div>
          <input placeholder="description de l'événement..." value={eventDescriptionInputValue} onChange={(event) => setEventDescriptionInputValue(event.target.value)}/>
        </div>
        <button type="submit">Enregistrer l'événement !</button>
      </form>
    </div>
  )
};

export default CreateEvent;
