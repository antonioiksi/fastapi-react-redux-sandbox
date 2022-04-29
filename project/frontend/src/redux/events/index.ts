import { BACKEND_URL } from "../../config";
import { backendFetch } from "../../utils/backend_fetch";
import { store } from "../store";
import * as eventsActions from "./actions"




export const getEvents = async (limit:any, offset:any, sortby:any)   => {
  const response = await backendFetch(BACKEND_URL + "/events", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "limit": limit,
      "offset": offset,
      "sortby": sortby
    })
  });

  const data = await response.json();

  if (data) {
    return (data);
  }

  return Promise.reject('Failed to get message from backend');
}

export const getEventsCount = async ()   => {

  const response = await backendFetch(BACKEND_URL + "/events_count")

  const data = await response.json();

  store.dispatch(eventsActions.setEventsCount(100))

  if (data) {
    return (data);
  }

    //   return Promise.reject('Failed to get message from backend');

}

export const addEvent = async (token, text)   => {
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  const response = await backendFetch(BACKEND_URL + "/add_event",{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      "text": text,
      "date": date,
    })})

  const data = await response.json();

  if (data) {
    return (data);
  }

  return Promise.reject('Failed to get message from backend');
}