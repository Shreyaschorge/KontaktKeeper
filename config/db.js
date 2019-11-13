const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

// ------------Promises-----------------

// const connectDB = () => {
//   mongoose
//     .connect(db, {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true
//     })
//     .then(() => console.log("Connected to Database"))
//     .catch(err => {
//       console.error(err.message);
//       process.exit(1);
//     });
// };

// --------------async await --------------------

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
