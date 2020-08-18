import React, { useEffect, useState, useRef, useContext} from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import swal from 'sweetalert';
import { isEmpty } from 'lodash';
import { GlobalStateContext } from '../Layout/HomeLayout';
import type from '../../reducers/type';
import { RouteContext } from '../../routes/routes';
import EndPoint from '../../constant/EndPoint';
import { get, call } from '../../utils/FetchUtils';
import ModalComponent from '../Common/ModalComponent';

const Comp = () => {
    const [localState, setLocalState] = useState({
        eventTypes: [],
        currentEventType: null,
        dateSlot1: new Date(),
        dateSlot2: new Date(),
        dateSlot3: new Date()
    });

    const [globalState, dispatch] = useContext(GlobalStateContext);

    const [user, setUser] = useContext(RouteContext);

    const locationRef = useRef(null);

    const buildData = async () => {
        let eventTypes = await (await get(EndPoint.GET_ALL_EVENT)).json();
        let currentEventType = null;
        if (!isEmpty(eventTypes)) {
            eventTypes = eventTypes.data;
            currentEventType = eventTypes[0].label;
        }

        setLocalState({ ...localState, eventTypes, currentEventType });
    }

    useEffect(() => {
        buildData();
    }, []);

    const { eventTypes, dateSlot1, dateSlot2, dateSlot3 } = localState;

    const onChangeDateSlot1 = date => {
        setLocalState({...localState, dateSlot1:date});
    }

    const onChangeDateSlot2 = date => {
        setLocalState({...localState, dateSlot2:date});
    }

    const onChangeDateSlot3 = date => {
        setLocalState({...localState, dateSlot3:date});
    }

    const setCurrentEventType = label =>{
        setLocalState({...localState, currentEventType: label});
    }

    const onSubmitHandler = async ()=> {
        const { currentEventType, dateSlot1, dateSlot2, dateSlot3 } = localState;

        const location = locationRef.current.value;
        if(isEmpty(location)){
            swal("Error", "Please enter your location", "error");
        }else if(!dateSlot1 || !dateSlot2 || !dateSlot3){
            swal("Error", "Please provide full slot of all proposed Date and Time", "error");
        }else{
            const data = {
                eventType: currentEventType,
                location: location,
                timeslot1: moment(dateSlot1).unix(),
                timeslot2: moment(dateSlot2).unix(),
                timeslot3: moment(dateSlot3).unix()
            }
            let response = await call(EndPoint.CREATE_BOOKING, data, 'POST', true);
            response = await response.json();
            
            // Create successfully
            if(response){
                document.getElementById('closeModal').click();
                dispatch({type:type.RELOAD_LIST_BOOKING});
            }
        }
    }

    return (
        <ModalComponent modalId='newBookingModal' title='Create new booking' onSubmit={onSubmitHandler}>
            <div className='create-booking-body'>
                <div className='item'>
                    <div className='label'>Event type</div>
                    <div className='value'>
                        <div className="dropdown show">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {localState.currentEventType}
                                </a>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                {
                                    eventTypes.map(e =>
                                        <a onClick={()=>setCurrentEventType(e.label)} key={e._id} className="dropdown-item" href="#">{e.label}</a>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <div className='label'>Location</div>
                    <div className='value'>
                        <input ref={locationRef} type='text' className='form-control' placeholder='Enter your location here...' />
                    </div>
                </div>
                <div className='item'>
                    <div className='label'>Proposed Date and Time</div>
                    <div className='value'>
                        <div className='date-slot'>
                            <span>Slot 1</span>
                            <DateTimePicker
                                onChange={onChangeDateSlot1}
                                value={dateSlot1}
                            />
                        </div>
                        <div className='date-slot'>
                            <span>Slot 2</span>
                            <DateTimePicker
                                onChange={onChangeDateSlot2}
                                value={dateSlot2}
                            />
                        </div>
                        <div className='date-slot'>
                            <span>Slot 3</span>
                            <DateTimePicker
                                onChange={onChangeDateSlot3}
                                value={dateSlot3}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </ModalComponent>
    )
}

export default Comp;