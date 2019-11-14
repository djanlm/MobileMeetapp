import { Alert } from 'react-native';
/** takeLatest prevents that the same action gets called many times if the user clicks several times on the same button, so it considers only the last click
 * call is used to make api requests (get, put, delete, post)
 * put calls the actions from the reducer
 */
import { takeLatest, call, put, all } from 'redux-saga/effects';
/** date-fns is used to work with dates, converts strings to date format and so on */
import { format, parseISO } from 'date-fns';
/** Converts utc-0 time to the timezone of the user */
import { utcToZonedTime } from 'date-fns-tz';

import api from '~/services/api';
import {
  editMeetupSuccess,
  deleteMeetupStateSuccess,
  updateMeetupSuccess,
  deleteMeetupSuccess,
} from './actions';

// fetchs all meetups and find the one needed for edition
export function* edit({ payload }) {
  try {
    const { id } = payload; // the id of the meetup that I want to edit
    const response = yield call(api.get, 'mymeetups'); // fetchs all my meetups

    // find the meetup with the same id passed with the payload
    const findMeetup = response.data.find(m => {
      return String(id) === String(m.id);
    });

    // if meetup was found, we format the date and insert the field formattedDate into the object returned
    if (findMeetup) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // fetchs the user time zone
      const pattern = "MMMM dd, 'at' HH'h'mm'm'";

      const zonedDate = utcToZonedTime(parseISO(findMeetup.date), timezone); // adapta a hora vinda de api pra o horário da time zone, por exemplo, se no utc-0 for 15 horas e a time zone do user for -3, a hora será convertida pra 12 horas
      const data = {
        ...findMeetup,
        formattedDate: format(zonedDate, pattern, { timezone }), // format the date to the pattern written before
      };
      yield put(editMeetupSuccess(data)); // send the returned meetup to the reducer where it will be stored in the state
    } else {
      yield put(editMeetupSuccess(null));
    }

    // history.push('/details'); // send the user to details page
  } catch (err) {
    Alert.alert('Failed to update profile.');
  }
}

// used to erase the state
export function* erase() {
  yield put(deleteMeetupStateSuccess());
  // history.push('/edit/0');
}

// create or update meetups
export function* update({ payload }) {
  try {
    const { meetupId } = payload.data;
    if (meetupId === '0') {
      // if id equal 0, it means the meetup is new and needs to be created
      yield call(api.post, `meetups`, payload.data);
      Alert.alert('Meetup created.');

      // history.push('/mymeetups');
    } else {
      const response = yield call(api.put, `meetups/${meetupId}`, payload.data);
      yield put(updateMeetupSuccess(response.data));
      Alert.alert('Meetup updated.');
      // history.push('/mymeetups');
    }
  } catch (err) {
    Alert.alert('Failed to update/create meetup.');
  }
}

// delete meetup from database
export function* deleteMeetup({ payload }) {
  const { id } = payload;

  try {
    const response = yield call(api.delete, `meetups/${id}`);
    console.tron.log(response);
    Alert.alert('Succesfully deleted meetup.');
    yield put(deleteMeetupSuccess());
    // history.push('/mymeetups');
  } catch (err) {
    Alert.alert('Failed to delete meetup.');
  }
}

export default all([
  takeLatest('@meetup/EDIT_MEETUP_REQUEST', edit),
  takeLatest('@meetup/DELETE_MEETUP_STATE_REQUEST', erase),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', update),
  takeLatest('@meetup/DELETE_MEETUP_REQUEST', deleteMeetup),
]);
