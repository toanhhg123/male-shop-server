const mongoose = require('mongoose');
const userName = process.env.USERNAME_DB;
const password = process.env.PASSWORD_DB;

// mongodb+srv://${userName}:${password}@maleshop.romotyj.mongodb.net/maleshop?retryWrites=true&w=majority
const connect = async () => {
    try {
        const conn = await mongoose.connect(
            `mongodb+srv://${userName}:${password}@maleshop.romotyj.mongodb.net/maleshop?retryWrites=true&w=majority`
        );
        console.log('connect success: ', conn.connection.host);
    } catch (error) {
        throw new Error({ ...error });
    }
};
module.exports = connect;
