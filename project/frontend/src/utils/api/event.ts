import { BACKEND_URL } from '../../config';

export const getEvents = async (limit:any, offset:any, sortby:any)   => {
  const response = await fetch(BACKEND_URL + "/events", {
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
  const response = await fetch(BACKEND_URL + "/events_count")

  const data = await response.json();

  if (data) {
    return (data);
  }

  return Promise.reject('Failed to get message from backend');
}