import * as actionTypes from "../actionTypes";

export const setEventsCount = payload => ({
    type: actionTypes.EVENTS_COUNT,
    payload,
});
