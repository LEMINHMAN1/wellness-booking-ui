const SERVER_URL = 'http://localhost:5000'

export default {
    USER_INFO: `${SERVER_URL}/userinfo`,
    LOGIN: `${SERVER_URL}/login`,
    NEW_TOKEN: `${SERVER_URL}/token`,
    GET_ALL_EVENT: `${SERVER_URL}/event/getAll`,
    CREATE_BOOKING: `${SERVER_URL}/booking/create`,
    GET_BOOKINGS: `${SERVER_URL}/booking/getAll`,
    REMOVE_BOOKING: `${SERVER_URL}/booking/removeById`,
    UPDATE_BOOKING_STATUS: `${SERVER_URL}/booking/updateStatus`,
}