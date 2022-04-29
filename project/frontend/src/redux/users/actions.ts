import * as actionTypes from "../actionTypes";

export const setUserToken = payload => ({
    type: actionTypes.USER_TOKEN,
    payload,
});
