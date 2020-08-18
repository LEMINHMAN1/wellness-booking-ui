import React, { useState, useContext } from 'react';
import { GlobalStateContext } from '../Layout/HomeLayout';
import EndPoint from '../../constant/EndPoint';
import { call } from '../../utils/FetchUtils';
import type from '../../reducers/type';
import { formatDateTime } from '../../utils/StringUtils';

const Comp = ({ data, index }) => {

    const [localState, setLocalState] = useState({ isRemoved: false });
    const [globalState, dispatch] = useContext(GlobalStateContext);

    const onCancelBooking = async () => {
        let response = await call(EndPoint.REMOVE_BOOKING, { bookingId: data._id }, 'DELETE', true);
        response = await response.json();
        
        // Create successfully
        if (response) {
            setLocalState({ ...localState, isRemoved: true });
            dispatch({type:type.RELOAD_LIST_BOOKING});
        }
    }

    if (localState.isRemoved) return null;

    return (
        <div className='item'>
            <div className='counter'>
                #{index + 1}
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
                    Location:
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
                        {formatDateTime(data.timeslot1)}
                        {data.dateSlotSelected === '1' && <span>(Confirmed)</span>}
                    </div>
                    <div className='slot-item'>
                        {formatDateTime(data.timeslot2)}
                        {data.dateSlotSelected === '2' && <span>(Confirmed)</span>}
                    </div>
                    <div className='slot-item'>
                        {formatDateTime(data.timeslot3)}
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
                    <button onClick={onCancelBooking} type='button' className='btn btn-sm btn-info'>Cancel booking</button>
                </div>
            }
        </div>

    )
}

export default Comp;