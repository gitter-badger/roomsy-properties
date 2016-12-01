var request = require('request');
//------------------------------------------------------------------------
var config = {
    baseUrl: 'http://roomsy-booking/api'
};
//------------------------------------------------------------------------
/**
 * @param {object} params
 * @param {string} params.property
 * @param {Date} params.startDate
 * @param {Date} params.endDate
 * @param {number} params.page
 * @param {number} params.limit
 */
var queryBooking = function(params, callback) {
    var requestOption = {
        baseUrl: config.baseUrl,
        url: 'bookings',
        method: 'GET',
        qs: params,
        json: true
    };
    
    request(requestOption, (err, response) => {
        if (!callback) return;
        if (err) return callback(err);
        callback(null, response);
    });
};
/**
 * @param {object} params
 * @param {string} params.bookingId
 */
var getBooking = function(params, callback) {
    var requestOption = {
        baseUrl: config.baseUrl,
        url: 'bookings/' + params.bookingId,
        method: 'GET',
        json: true
    };
    request(requestOption, (err, response) => {
        if (!callback) return;
        if (err) return callback(err);
        callback(null, response);
    });
};
/**
 * @param {object} params
 * @param {string} params.bookingId
 * @param {string} params.property
 * @param {string} params.room
 * @param {Date} params.startDate
 * @param {Date} params.endDate
 * @param {string[]} params.customers
 */
var createBooking = function(params, callback) {
    var requestOption = {
        baseUrl: config.baseUrl,
        url: 'bookings',
        method: 'POST',
        body: params,
        json: true
    };
    
    request(requestOption, (err, response) => {
        if (!callback) return;
        if (err) return callback(err);
        callback(null, response);
    });
};
/**
 * @param {object} params
 * @param {string} params.bookingId
 * @param {string} params.room
 * @param {Date} params.startDate
 * @param {Date} params.endDate
 * @param {string[]} params.customers
 */
var updateBooking = function(params, callback) {
    var requestOption = {
        baseUrl: config.baseUrl,
        url: 'bookings/' + params.bookingId,
        method: 'PUT',
        body: params,
        json: true
    };
    
    request(requestOption, (err, response) => {
        if (!callback) return;
        if (err) return callback(err);
        callback(null, response);
    });
};
/**
 * @param {object} params
 * @param {string} params.bookingId
 */
var deleteBooking = function(params, callback) {
    var requestOption = {
        baseUrl: config.baseUrl,
        url: 'bookings/' + params.bookingId,
        method: 'DELETE',
        json: true
    };
    
    request(requestOption, (err, response) => {
        if (!callback) return;
        if (err) return callback(err);
        callback(null, response);
    });
};
//------------------------------------------------------------------------
module.exports = {
    queryBooking: queryBooking,
    getBooking: getBooking,
    createBooking: createBooking,
    updateBooking: updateBooking,
    deleteBooking: deleteBooking
};