import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    const response2 = yield call(api.get, 'subscriptions'); // fetchs all my meetups
    console.tron.log(response2.data);
    // find the meetup with the same id passed with the payload
    /* const findMeetup = response.data.find(m => {
      return String(id) === String(m.id);
    }); */
    const pattern = "MMMM dd 'at' HH'h'mm'm'";

    const subscribedMeetups = response2.data.map(meetup => {
      return {
        ...meetup,
        formattedDate: format(parseISO(meetup.Meetup.date), pattern),
      };
    });

    yield put(signInSuccess(token, user, subscribedMeetups));

    // history.push('/mymeetups');
  } catch (err) {
    Alert.alert('Authentication Failed');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // history.push('/');
  } catch (err) {
    Alert.alert('Signup failure, check your input!');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
