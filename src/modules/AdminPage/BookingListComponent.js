import React, { useState, useRef } from 'react';
import swal from 'sweetalert';
import { isEmpty } from 'lodash';
import { get, call } from '../../utils/FetchUtils';
import EndPoint from '../../constant/EndPoint';
import ModalComponent from '../Common/ModalComponent';
import type from '../../reducers/type';
import BookingItem from './BookingItemComponent';
import { formatDateTime } from '../../utils/StringUtils';

const Comp = ({ globalState, dispatch, bookings }) => {

    const [localState, setLocalState] = useState({
        slotSelected: 1
    })

    const rejectReasonRef = useRef(null);

    const onSelectedSlot = slot =>{
        setLocalState({...localState, slotSelected:slot});
    }

    const onSubmitHandler = async () => {
        const isReject = globalState.isReject;
        const isApprove = globalState.isApprove;

        let data = null

        // Reject
        if (isReject) {
            const reason = rejectReasonRef.current.value;

            if(isEmpty(reason)){
                swal("Error", "Please enter the reason", "error");
                return;
            }

            data = {
                bookingId: globalState.bookingId,
                reason,
                status: 'Rejected'
            }
        } else if (isApprove) {
            data = {
                bookingId: globalState.bookingId,
                slotSelected: localState.slotSelected.toString(),
                status: 'Approved'
            }
        }

        if (isEmpty(data)) return;

        let response = await call(EndPoint.UPDATE_BOOKING_STATUS, data, 'PATCH', true);
        response = await response.json();

        // Update successfully
        if (response) {
            document.getElementById('closeModal').click();
            dispatch({ type: type.RELOAD_LIST_BOOKING });
        }
    }

    const { timeslot1, timeslot2, timeslot3 } = globalState;
    const {slotSelected} = localState;

    return (
        <div className='list-booking'>
            {
                bookings.map((e, i) =>
                    <BookingItem key={e._id} data={e} index={i} />
                )
            }

            {/* Reject modal */}
            <ModalComponent modalId='rejectBookingModal' title='Confirm to reject' onSubmit={onSubmitHandler} submitLabel='Reject'>
                <div className='modal-content-group'>
                    <textarea ref={rejectReasonRef} maxLength='3000' type='text' className='form-control' placeholder='Reason to reject...'></textarea>
                </div>
            </ModalComponent>

            {/* Approve modal */}
            <ModalComponent modalId='approveBookingModal' title='Confirm to approve' onSubmit={onSubmitHandler} submitLabel='Approve'>
                <div className='modal-content-group'>
                    <div className='item'>
                        <div className='t'>
                            {formatDateTime(timeslot1)}
                        </div>
                        <div>
                            <button onClick={()=>onSelectedSlot(1)} type='button' className={`btn btn-sm ${slotSelected === 1 ? 'btn-info' : 'btn-lignt'}`}>{slotSelected === 1 ? 'Confirmed' : 'Confirm'}</button>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='t'>
                            {formatDateTime(timeslot2)}
                        </div>
                        <div>
                            <button onClick={()=>onSelectedSlot(2)} type='button' className={`btn btn-sm ${slotSelected === 2? 'btn-info' : 'btn-lignt'}`}>{slotSelected === 2 ? 'Confirmed' : 'Confirm'}</button>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='t'>
                            {formatDateTime(timeslot3)}
                        </div>
                        <div>
                            <button onClick={()=>onSelectedSlot(3)} type='button' className={`btn btn-sm ${slotSelected === 3 ? 'btn-info' : 'btn-lignt'}`}>{slotSelected === 3 ? 'Confirmed' : 'Confirm'}</button>
                        </div>
                    </div>
                </div>
            </ModalComponent>

        </div>

    )
}

export default Comp;