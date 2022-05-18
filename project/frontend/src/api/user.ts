import { BACKEND_URL } from '../config';
import { backendFetch } from '../utils/backend_fetch';

export const getUsers = async () => {
  const response = await backendFetch(BACKEND_URL + "/users");

  const data = await response.json();

  if (data) {
    return data;
  }

  return Promise.reject('Failed to get message from backend');
};

export const getUserInfo = async (token) => {
  const response = await backendFetch(BACKEND_URL + "/info",{
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

export const logout = async (token)   => {

  const response = await backendFetch(BACKEND_URL + "/logout",{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
  })

  const data = await response.json();

  if (data) {
    return (data);
  }

  return Promise.reject('Failed to get message from backend');
}