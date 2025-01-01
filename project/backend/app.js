const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = process.env.PORT
const messages = require('./routes/messages')

app.use('/', routes)

// 변수 확인하기(포트, DB)
if(!process.env.PORT) {
  const errMsg = "PORT environment variable is not defined"
  console.error(errMsg)
  throw new Error(errMsg)
}

if(!process.env.GUESTBOOK_DB_ADDR) {
  const errMsg = "GUESTBOOK_DB_ADDR environment variable is not defined"
  console.error(errMsg)
  throw new Error(errMsg)
}

// DB 연결하기
messages.connectToMongoDB()

// 환경변수로 http시작하기
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app
