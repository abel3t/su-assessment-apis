const mongoose = require('mongoose');


require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
    .then(() => console.log('Database is Connected!'), (error) => {
      console.log('Can\'t connect to the Database', error);
    });