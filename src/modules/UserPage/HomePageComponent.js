import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { reactLocalStorage } from 'reactjs-localstorage';
import type from '../../reducers/type';
import { RouteContext } from '../../routes/routes';
import { GlobalStateContext } from '../Layout/HomeLayout';
import EndPoint from '../../constant/EndPoint';
import { get } from '../../utils/FetchUtils';
import BookingListComponent from './BookingListComponent';
import CreateBookingComponent from './CreateBookingComponent';
import './stylesheet.scss';

const HomePageComponent = () => {
    const [user, setUser] = useContext(RouteContext);
    const [globalState, dispatch] = useContext(GlobalStateContext);
    const [localState, setLocalState] = useState({ userInfo: {}, eventTypes: [], bookings: [], hasInit:false });

    const buildData = async () => {
        if (!isEmpty(user)) {

            // Get all event types
            let eventTypes = await (await get(EndPoint.GET_ALL_EVENT)).json();
            if (!isEmpty(eventTypes)) eventTypes = eventTypes.data;
            else eventTypes = [];

            await dispatchBuildBookings();

            setLocalState({ ...localState, hasInit: true, userInfo: user, eventTypes });
        }
    }

    const dispatchBuildBookings = async () => {
        let bookings = await (await get(`${EndPoint.GET_BOOKINGS}`)).json();

        if (!isEmpty(bookings)) bookings = bookings.data;
        else bookings = [];

        dispatch({ type: type.LIST_BOOKING, bookings });
    }

    useEffect(() => {
        buildData();
    }, [user, globalState.hasLoadBookings]);

    const { userInfo, eventTypes } = localState;
    const { bookings } = globalState;

    if (isEmpty(userInfo)) {
        return (
            <div className='loading-message'>
                Loading...
            </div>
        )
    }

    const onLogout = () => {
        reactLocalStorage.remove('token');
        window.location.reload();
    }

    return (
        <div className='home-group'>
            <div className='row fixed'>
                <div className='col-md-6'>
                    <div className='welcome'>
                        Welcome, <strong>{userInfo.username}</strong> (<span onClick={onLogout} className='logout'>logout</span>)
                        <div className='roleinfo'>
                            Current role: {userInfo.role}
                        </div>
                        <div>
                            <button type='button' className='btn btn-sm btn-success' data-toggle="modal" data-target="#newBookingModal">Create new booking</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row booking-group'>
                <div className='col-md-6'>
                    <div className='total'>
                        Total booking: {bookings.length}
                    </div>
                    <BookingListComponent bookings={bookings}/>
                </div>
            </div>

            <CreateBookingComponent />

        </div>
    )
}

export default HomePageComponent;