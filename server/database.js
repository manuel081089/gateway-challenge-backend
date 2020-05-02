const mongoose = require('mongoose');
const URI = 'mongodb://localhost/musala-challenge'
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => console.log('DB is connected'))
.catch(err => console.log('Error', err));

module.exports = mongoose;
