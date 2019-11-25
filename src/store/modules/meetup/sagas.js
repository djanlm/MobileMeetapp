import { Alert } from 'react-native';
/** takeLatest prevents that the same action gets called many times if the user clicks several times on the same button, so it considers only the last click
 * call is used to make api requests (get, put, delete, post)
 * put calls the actions from the reducer
 */
import { takeLatest, call, put, all } from 'redux-saga/effects';
/** date-fns is used to work with dates, converts strings to date format and so on */
import { format, parseISO } from 'date-fns';

import api from '~/services/api';
import { deleteMeetupSuccess, fecthMeetupsSuccess } from './actions';

// fetchs all meetups and find the one needed for edition
export function* getSubscribedMeetups() {
  try {
    // const { id } = payload; // the id of the meetup that I want to edit
    const response = yield call(api.get, 'subscriptions'); // fetchs all my meetups
    // console.tron.log(response.data);
    // find the meetup with the same id passed with the payload
    /* const findMeetup = response.data.find(m => {
      return String(id) === String(m.id);
    }); */
    const pattern = "MMMM dd 'at' HH'h'mm'm'";

    const data = response.data.map(meetup => {
      return {
        ...meetup,
        formattedDate: format(parseISO(meetup.Meetup.date), pattern),
      };
    });

    // if meetup was found, we format the date and insert the field formattedDate into the object returned

    yield put(fecthMeetupsSuccess(data)); // send the returned meetup to the reducer where it will be stored in the state

    // history.push('/details'); // send the user to details page
  } catch (err) {
    Alert.alert('Failed to fetch subscribed meetups.');
  }
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
      // const response = yield call(api.put, `meetups/${meetupId}`, payload.data);
      // yield put(updateMeetupSuccess(response.data));
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
  takeLatest('@meetup/DELETE_MEETUP_REQUEST', deleteMeetup),
  takeLatest('@meetup/FETCH_MEETUPS_REQUEST', getSubscribedMeetups),
]);
