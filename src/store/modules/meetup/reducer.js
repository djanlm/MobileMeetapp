import produce from 'immer';

const INITIAL_STATE = {
  meetup: null,
};
export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/EDIT_MEETUP_REQUEST': {
        break;
      }
      case '@meetup/EDIT_MEETUP_SUCCESS': {
        draft.meetup = action.payload.editMeetup;
        break;
      }
      case '@meetup/DELETE_MEETUP_STATE_REQUEST': {
        break;
      }
      case '@meetup/DELETE_MEETUP_STATE_SUCCESS': {
        draft.meetup = null;
        break;
      }
      case '@meetup/UPDATE_MEETUP_REQUEST': {
        break;
      }
      case '@meetup/UPDATE_MEETUP_SUCCESS': {
        draft.meetup = action.payload.updatedMeetup;
        break;
      }
      case '@meetup/DELETE_MEETUP_REQUEST': {
        break;
      }
      case '@meetup/DELETE_MEETUP_SUCCESS': {
        draft.meetup = null;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.meetup = null;
        break;
      }
      default:
    }
  });
}
