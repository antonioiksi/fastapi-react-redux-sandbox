import * as actionTypes from "../actionTypes"


export const initialState = {
    count: 0,
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EVENTS_COUNT:
            return {
                count: action.payload,
            };
        default:
            return state;
    }
};
