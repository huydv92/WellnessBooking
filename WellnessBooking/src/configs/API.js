const API_ROOT = 'https://dfljauq3a1.execute-api.ap-southeast-1.amazonaws.com/default';

export default API = {
    AUTH: {
      LOGIN: API_ROOT + '/DeveloperTest_Login'
    },
    CREATE: {
        BOOKING: API_ROOT + '/DeveloperTest_CreateBooking'
    },
    GET: {
        BOOKING: API_ROOT + '/DeveloperTest_GetBookings'
    }
};