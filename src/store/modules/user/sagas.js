import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* update({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    /* const profile = Object.assign({ name, email },rest.oldPassword ? rest : {}); */
    const profile = rest.oldPassword
      ? { name, email, ...rest }
      : { name, email };

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Profile was updated.');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert('Failed to update profile.');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', update)]);
