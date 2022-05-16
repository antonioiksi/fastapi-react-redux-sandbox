import { BACKEND_URL } from "../config";
import jwt_decode from "jwt-decode";
import { store } from "../redux/store";
import * as usersActions from "../redux/users/actions";
import * as timeActions from "../redux/time/actions";

export const backendFetch = async (url, data = {}) => {
  let response = await fetch(BACKEND_URL + "/update", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "Bearer " + store.getState().users.token,
    },
  });
  const token = await response.json();

  let expire = jwt_decode<object>(token)["expire"];

  store.dispatch(usersActions.setUserToken(token));
  store.dispatch(timeActions.setExpireTime(expire));
  // console.log(token);

  response = await fetch(url, data);

  return response;
};
