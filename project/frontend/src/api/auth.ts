import { BACKEND_URL } from "../config";

export const login = async (email: string, password: string) => {
  if (!(email.length > 0) || !(password.length > 0)) {
    throw new Error('Email or password was not provided');
  }
    const Data = {
        "fullname": email,
        "password": password
    };

  const request = new Request(BACKEND_URL + '/user/login', {
    method: 'POST',
    body: JSON.stringify(Data),
  });

  let response = await fetch(request);
  if (response.status === 500) {
    throw new Error('Internal server error');
  }
  const data = await response.json();

  if (response.status > 400 && response.status < 500) {
    if (data.detail) {
      throw data.detail;
    }
    throw data;
  }

  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('permissions');
};