import produce from 'immer';

const INITIAL_STATE = {
  meetups: null,
};
export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.meetups = action.payload.subscribedMeetups;
        break;
      }
      case '@meetup/FETCH_MEETUPS_SUCCESS': {
        draft.meetups = action.payload.meetups;
        break;
      }
      case '@meetup/DELETE_MEETUP_REQUEST': {
        break;
      }
      case '@meetup/DELETE_MEETUP_SUCCESS': {
        draft.meetups = null;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.meetups = null;
        break;
      }
      default:
    }
  });
}
