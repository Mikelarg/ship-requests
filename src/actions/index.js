export const GET_ALL_REQUESTS = 'GET_ALL_REQUESTS';
export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const RECEIVE_REQUESTS = 'RECEIVE_REQUESTS';

export const GET_ALL_ADDRESSES = 'GET_ALL_REQUESTS';
export const RECEIVE_ADDRESSES = 'RECEIVE_ADDRESSES';

export const SET_CURRENT_REQUEST = 'SET_CURRENT_REQUEST';

export function getAllRequests() {
    return {
        type: GET_ALL_REQUESTS,
    }
}

export function receiveRequests(requests) {
    return {
        type: RECEIVE_REQUESTS,
        requests,
    }
}

export function updateRequest(requestId, addressFrom, addressTo) {
    return {
        type: UPDATE_REQUEST,
        requestId,
        addressFrom,
        addressTo
    }
}


export function getAllAddresses() {
    return {
        type: GET_ALL_ADDRESSES,
    }
}

export function receiveAddresses(addresses) {
    return {
        type: RECEIVE_ADDRESSES,
        addresses,
    }
}

export function setCurrentRequest(request) {
    return {
        type: SET_CURRENT_REQUEST,
        request,
    }
}
