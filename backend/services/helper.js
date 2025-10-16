const crypto = require('crypto');

// Generate a username: lastname + first 2 letters of firstname, lowercase
function generateUsername(firstName, lastName) {
    const clean = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return `${clean(lastName)}${clean(firstName).slice(0, 2)}`;
}

function generateRandomPassword(length = 8) {
    return crypto
        .randomBytes(length)
        .toString('base64')         // convert to letters+numbers
        .replace(/[^a-zA-Z0-9]/g, '') // strip non-alphanumeric
        .substring(0, length);        // ensure fixed length
}

module.exports = {
    generateUsername,
    generateRandomPassword
}