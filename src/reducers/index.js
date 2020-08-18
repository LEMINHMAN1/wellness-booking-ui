import type from './type';

export default (state = {}, action) => {
  switch (action.type) {
    case type.LIST_BOOKING: return { ...state, bookings: action.bookings }
    case type.RELOAD_LIST_BOOKING: return { ...state, hasLoadBookings: Math.random() }
    case type.REJECT_BOOKING: return ({ ...state, bookingId: action.bookingId, isReject: true, isApprove: false });
    case type.APPROVE_BOOKING: return ({ ...state, bookingId: action.bookingId, timeslot1: action.timeslot1, timeslot2: action.timeslot2, timeslot3: action.timeslot3, isReject: false, isApprove: true });
  }
}
