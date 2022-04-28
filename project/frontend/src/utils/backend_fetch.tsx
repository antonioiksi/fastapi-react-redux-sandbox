import { BACKEND_URL } from "../config";
import jwt_decode from "jwt-decode";

export const backendFetch = async (url, data = {}) => {
  // let response = await fetch(BACKEND_URL + "/update", {
  //   method: "GET",
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     authorization: "Bearer " + localStorage.getItem("token"),
  //   },
  // });
  // const token = await response.json();

  // let expire = jwt_decode<object>(token)["expire"];

  // localStorage.setItem("token", token);
  // localStorage.setItem("expire", expire);
  // console.log(token);

  let response = await fetch(url, data);

  return response;
};
