import {RECEIVE_REQUESTS, UPDATE_REQUEST, SET_CURRENT_REQUEST} from '../actions'

const requests = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_REQUESTS:
            return {
                ...action.requests.reduce((obj, request) => {
                    obj[request.id] = request;
                    return obj
                }, {}),
            };
        case UPDATE_REQUEST:
            return {
                ...state,
                [action.requestId]: {
                    ...state[action.requestId],
                    address_from_id: action.addressFrom.id,
                    address_from: action.addressFrom,
                    address_to_id: action.addressTo.id,
                    address_to: action.addressTo,
                }
            };
        default:
            return state;
    }
};

const currentRequest = (state = {}, action) => {
    switch (action.type) {
        case SET_CURRENT_REQUEST:
            return {...action.request};
        case UPDATE_REQUEST:
            if (state.id === action.requestId) {
                return {
                    ...state,
                    address_from_id: action.addressFrom.id,
                    address_from: action.addressFrom,
                    address_to_id: action.addressTo.id,
                    address_to: action.addressTo,
                };
            }
            return state;
        default:
            return state;
    }
};

export default {requests, currentRequest};

export function getRequest(state, id) {
    return state[id]
}
