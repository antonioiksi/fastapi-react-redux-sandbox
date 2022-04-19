import { BACKEND_URL } from '../../config';

export const getUsers = async () => {
  const response = await fetch(BACKEND_URL + "/users");

  const data = await response.json();

  if (data) {
    return data;
  }

  return Promise.reject('Failed to get message from backend');
};