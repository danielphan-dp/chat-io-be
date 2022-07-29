const httpStatus = require('http-status');

module.exports = {
  sendTestSuccessMessage: (req, res) => {
    res.status(httpStatus.OK).send('Token authentication request passed.');
  },
};
