import * as actionTypes from "../actionTypes";

export const setExpireTime = payload => ({
    type: actionTypes.EXPIRE_TIME,
    payload,
});
