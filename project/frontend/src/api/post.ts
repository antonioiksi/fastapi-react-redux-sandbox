import { BACKEND_URL } from '../config';
import { backendFetch } from '../utils/backend_fetch';

export const getPosts = async (limit:any, offset:any, sortby:any)   => {
  const response = await backendFetch(BACKEND_URL + "/posts", {
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
export const getPostsCount = async ()   => {
  const response = await backendFetch(BACKEND_URL + "/post_count")

  const data = await response.json();

  if (data) {
    return (data);
  }

  return Promise.reject('Failed to get message from backend');
}

export const changePost = async (id:any, title:any, text:any, create_date:any )   => {

  const response = await backendFetch(BACKEND_URL + "/change", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "id": String(id),
      "title": String(title),
      "text": String(text),
      "create_date": create_date
    })
  });


  const data = await response.json();

  if (data) {
    return (data);
  }

  return Promise.reject('Failed to get message from backend');
}

export const deletePost = async (id:any)   => {

  const response = await backendFetch(BACKEND_URL + "/delete", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "id": String(id),
    })
  });

  const data = await response.json();

  if (data) {
    return (data);
  }

  return Promise.reject('Failed to get message from backend');
}