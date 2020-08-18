import React, { useContext, useState } from 'react';
import type from '../../reducers/type';
import { formatDateTime } from '../../utils/StringUtils';
import { GlobalStateContext } from '../Layout/HomeLayout';

const Comp = ({ data, index }) => {

    const [localState, setLocalState] = useState({ isRemoved: false });
    const [globalState, dispatch] = useContext(GlobalStateContext);

    const onApproveBooking = async () => {
        dispatch({
            type: type.APPROVE_BOOKING,
            bookingId: data._id,
            timeSlot1: data.timeslot1,
            timeSlot2: data.timeslot2,
            timeSlot3: data.timeslot3
        });
    }

    const onRejectBooking = async () => {
        dispatch({
            type: type.REJECT_BOOKING,
            bookingId: data._id
        });
    }

    if (localState.isRemoved) return null;

    return (
        <div className='item'>
            <div className='counter'>
                #{index + 1}
            </div>
            <div className='kv'>
                <div className='k'>
                    Created by:
                            </div>
                <div className='v'>
                    {data.username}
                </div>
            </div>
            <div className='kv'>
                <div className='k'>
                    Event type :
                </div>
                <div className='v'>
                    {data.eventType}
                </div>
            </div>
            <div className='kv'>
                <div className='k'>
                    Location :
                </div>
                <div className='v'>
                    {data.location}
                </div>
            </div>
            <div className='kv'>
                <div className='k'>
                    Proposed timing:
                </div>
                <div className='v'>
                    <div className='slot-item'>
                        {formatDateTime(data.timeSlot1)}
                        {data.dateSlotSelected === '1' && <span>(Confirmed)</span>}
                    </div>
                    <div className='slot-item'>
                        {formatDateTime(data.timeSlot2)}
                        {data.dateSlotSelected === '2' && <span>(Confirmed)</span>}
                    </div>
                    <div className='slot-item'>
                        {formatDateTime(data.timeSlot3)}
                        {data.dateSlotSelected === '3' && <span>(Confirmed)</span>}
                    </div>
                </div>
            </div>
            <div className='kv'>
                <div className='k'>
                    Status:
                </div>
                <div className='v'>
                    {data.status}
                </div>
            </div>
            {
                data.status === 'Rejected'
                &&
                <div className='kv'>
                    <div className='k'>
                        Reason:
                </div>
                    <div className='v'>
                        {data.reason}
                    </div>
                </div>
            }

            {
                data.status === 'Pending Review'
                &&
                <div className='action-group'>
                    <button onClick={onRejectBooking} type='button' className='btn btn-sm btn-default' data-toggle="modal" data-target="#rejectBookingModal">Reject</button>
                    <button onClick={onApproveBooking} type='button' className='btn btn-sm btn-info' data-toggle="modal" data-target="#approveBookingModal">Approve</button>
                </div>
            }
        </div>

    )
}

export default Comp;