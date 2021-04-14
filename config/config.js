require('dotenv').config();

module.exports = {
  "development": {
    "url": process.env.DATABASE_URL,
    "dialect": "postgres",
    "port": 5432,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  },
  "production": {
    "dialect": "postgres",
    "port": 5432,
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}