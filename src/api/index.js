import _request from './requests'
import _addresses from './addresses'

const TIMEOUT = 200;

export const api = {
    getRequests() {
        return new Promise(resolve => {
            setTimeout(() => resolve(_request.data), TIMEOUT)
        })
    },
    getAddresses() {
        return new Promise(resolve => {
            setTimeout(() => resolve(_addresses.data), TIMEOUT)
        })
    },
}