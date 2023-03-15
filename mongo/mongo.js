const mongoose = require("mongoose");

const options = {
    maxPoolSize: 100,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

const db_URI = process.env.db_URI;
mongoose.set('strictQuery', false);
mongoose.connect(db_URI, options)
.then(() => {
    console.log('Mongo Atlas has been connected');
})
.catch((err) => {
    console.log(`Mongo Atlas has not been connected due to: ${err.message}`);
})

