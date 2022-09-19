import { put, call, fork, takeEvery, all } from 'redux-saga/effects'
import * as actions from '../actions'
import { api } from '../api'

export function* getAllRequests() {
    const requests = yield call(api.getRequests);
    yield put(actions.receiveRequests(requests))
}

export function* watchGetProducts() {
    yield takeEvery(actions.GET_ALL_REQUESTS, getAllRequests)
}

export function* getAllAddresses() {
    const addresses = yield call(api.getAddresses);
    yield put(actions.receiveAddresses(addresses))
}

export function* watchGetAddresses() {
    yield takeEvery(actions.GET_ALL_ADDRESSES, getAllAddresses)
}

export default function* root() {
    yield getAllAddresses();
    yield getAllRequests();
    yield all([fork(watchGetProducts), fork(watchGetAddresses)])
}
