import * as actionTypes from "../actionTypes"


export const initialState = {
    expire: 0,
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EXPIRE_TIME:
            return {
                expire: action.payload,
            };
        default:
            return state;
    }
};
