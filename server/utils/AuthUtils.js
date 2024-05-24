
const bcrypt = require('bcrypt');
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function encryptPassword(password) {
    try {
        const saltRounds = SALT_ROUND; 
        const hashedPassword =  bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error("Error encrypting password:", error);
        throw error;
    }
}

function checkPassword(password, hashedPassword) {
    try {
         bcrypt.compare(password, hashedPassword);
        return true;
    } catch (error) {
        return false;
    }
}
module.exports = {isValidEmail,encryptPassword,checkPassword}
