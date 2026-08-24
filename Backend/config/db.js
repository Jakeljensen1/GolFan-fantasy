const mongoose = require('mongoose');

const connectDb = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGODB_PW}@golfan.ahkl3nj.mongodb.net/?appName=golfan`)
    .then(() => {
      console.log('MongoDB connected')
    })
    .catch(err => console.log('DB connection Error:', err));
}

module.exports = connectDb;