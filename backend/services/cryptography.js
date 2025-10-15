const crypto = require('crypto');

function generateRandomString(length = 8) {
    return crypto
        .randomBytes(length)
        .toString('base64')         // convert to letters+numbers
        .replace(/[^a-zA-Z0-9]/g, '') // strip non-alphanumeric
        .substring(0, length);        // ensure fixed length
}

module.exports = {
    generateRandomString,
}