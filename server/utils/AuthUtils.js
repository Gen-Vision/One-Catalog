
const bcrypt = require('bcrypt');
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function encryptPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error("Error encrypting password:", error);
        throw error;
    }
}

async function checkPassword(password, hashedPassword) {
    try {
         await bcrypt.compare(password, hashedPassword);
        return true;
    } catch (error) {
        return false;
    }
}
module.exports = {isValidEmail,encryptPassword,checkPassword}
