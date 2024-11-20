require('dotenv').config()

const config = {
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.NODE_ENV==='test'? process.env.LOCAL_MONGODB_URI : process.env.MONGODB_URI,
}

module.exports = config