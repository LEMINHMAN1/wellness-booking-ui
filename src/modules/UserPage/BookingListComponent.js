import { isEmpty } from 'lodash';
import React from 'react';
import BookingItem from './BookingItemComponent';

const Comp = ({dispatch, bookings }) => {

    return (
        <div className='list-booking'>
            {
                bookings.map((e, i) =>
                    <BookingItem key={e._id} data={e} index={i}/>
                )
            }
        </div>

    )
}

export default Comp;