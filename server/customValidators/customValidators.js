const moment = require('moment');

const customValidators = {};
const DATE_FORMAT = 'YYYY-MM-DD';

customValidators.isValidDate = (value) => {
  return moment(value, DATE_FORMAT).format(DATE_FORMAT) === value;
};

customValidators.validateIPaddress = (ipaddress) => {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ipaddress
    )
  ) {
    return true;
  }
  return false;
};

module.exports = customValidators;
