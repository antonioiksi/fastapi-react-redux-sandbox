import { BACKEND_URL } from '../../config';

export const getUsers = async () => {
  const response = await fetch(BACKEND_URL + "/users");

  const data = await response.json();

  if (data) {
    return data;
  }

  return Promise.reject('Failed to get message from backend');
};
export const getUserInfo = async (token) => {
  const response = await fetch(BACKEND_URL + "/info",{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    }})

  const data = await response.json();

  if (data) {
    return data;
  }

  return Promise.reject('Failed to get message from backend');
};