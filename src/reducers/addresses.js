import { RECEIVE_ADDRESSES } from '../actions'

const addresses = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ADDRESSES:
            return {
                ...state,
                ...action.addresses.reduce((obj, address) => {
                    obj[address.id] = address;
                    return obj
                }, {}),
            };
        default:
            return state;
    }
};

export default addresses;

export function getAddress(state, id) {
    return state[id]
}
