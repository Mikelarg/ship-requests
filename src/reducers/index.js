import { combineReducers } from 'redux';
import requests from "./requests";
import addresses from "./addresses";

const mainReducer = combineReducers({
    requests,
    addresses,
});

export function getRequestsWithAddresses(state) {
    const requests = {...state.requests};
    for (const value of Object.values(requests)) {
        value.address_from = state.addresses[value.address_from_id];
        value.address_to = state.addresses[value.address_to_id];
    }
    return requests;
}

export default function root(state, action) {
    return mainReducer(state, action)
}
