import type from './type';

export default (state = {}, action) => {
  switch (action.type) {
    case type.LIST_BOOKING: return { ...state, bookings: action.bookings }
    case type.RELOAD_LIST_BOOKING: return { ...state, hasLoadBookings: Math.random() }
    case type.REJECT_BOOKING: return ({ ...state, bookingId: action.bookingId, isReject: true, isApprove: false });
    case type.APPROVE_BOOKING: return ({ ...state, bookingId: action.bookingId, timeSlot1: action.timeSlot1, timeSlot2: action.timeSlot2, timeSlot3: action.timeSlot3, isReject: false, isApprove: true });
  }
}
