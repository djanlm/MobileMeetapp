export function editMeetupRequest(id) {
  return {
    type: '@meetup/EDIT_MEETUP_REQUEST',
    payload: { id },
  };
}

export function editMeetupSuccess(editMeetup) {
  return {
    type: '@meetup/EDIT_MEETUP_SUCCESS',
    payload: { editMeetup },
  };
}

export function deleteMeetupStateRequest() {
  return {
    type: '@meetup/DELETE_MEETUP_STATE_REQUEST',
  };
}

export function deleteMeetupStateSuccess() {
  return {
    type: '@meetup/DELETE_MEETUP_STATE_SUCCESS',
  };
}

export function updateMeetupRequest(data) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { data },
  };
}

export function updateMeetupSuccess(updatedMeetup) {
  return {
    type: '@meetup/UPDATE_MEETUP_SUCCESS',
    payload: { updatedMeetup },
  };
}

export function updateMeetupFailure() {
  return {
    type: '@meetup/UPDATE_MEETUP_FAILURE',
  };
}

export function deleteMeetupRequest(id) {
  return {
    type: '@meetup/DELETE_MEETUP_REQUEST',
    payload: { id },
  };
}

export function deleteMeetupSuccess() {
  return {
    type: '@meetup/DELETE_MEETUP_SUCCESS',
  };
}
