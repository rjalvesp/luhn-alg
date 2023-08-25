const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@luhn': path.resolve(__dirname, 'src/'),
    },
  },
};
