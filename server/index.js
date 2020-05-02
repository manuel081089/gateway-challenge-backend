const express = require ('express');
const morgan = require ('morgan');
const expressValidator = require('express-validator')
const app = express();
const cors = require('cors');

const {mongoose} = require('./database')

// Setting
app.set('port',process.env.PORT || 3000);

// Midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(expressValidator());

// allow cors
app.use(cors());
app.options('*', cors());

// Routes
app.use('/api/gateways',require('./routes/gateways.route'));
app.use('/api/devices',require('./routes/devices.route'));



// Starting Server
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'))
});
