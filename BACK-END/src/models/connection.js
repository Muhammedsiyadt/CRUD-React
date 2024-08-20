const mongoose = require("mongoose");

const database = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
          console.log(`Connected database `) 
    } catch (error) {
        console.log(error);
    };
      
}

module.exports = database


