import * as actionTypes from "../actionTypes"


export const initialState = {
    token: "",
};


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_TOKEN:
            return {
                token: action.payload,
            };
        default:
            return state;
    }
};
