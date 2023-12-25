const mongoose = require("mongoose");

let connectToDataBase = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log(`The Connection established Successfully !!!`);       
    } catch (error) {
        console.log(`The Connection to the Database didn't established due to ${error}`);
    }

};

module.exports = {
    connectToDataBase,
}
