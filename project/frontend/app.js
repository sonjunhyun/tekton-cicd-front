const express = require('express')
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const axios = require('axios')

const util = require('./utils')

const GUESTBOOK_API_ADDR = process.env.GUESTBOOK_API_ADDR

const BACKEND_URI = `http://${GUESTBOOK_API_ADDR}/messages`

app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))

const router = express.Router()
app.use(router)

app.use(express.static('public'))
router.use(bodyParser.urlencoded({ extended: false }))



// 환경변수 검증
if(!process.env.PORT) {
  const errMsg = "PORT environment variable is not defined"
  console.error(errMsg)
  throw new Error(errMsg)
}

if(!process.env.GUESTBOOK_API_ADDR) {
  const errMsg = "GUESTBOOK_API_ADDR environment variable is not defined"
  console.error(errMsg)
  throw new Error(errMsg)
}

// 환경변수로 포트해주는거
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

// 백엔드로 부터 가져오는거
router.get("/", (req, res) => {
   
    axios.get(BACKEND_URI)
      .then(response => {
        console.log(`response from ${BACKEND_URI}: ` + response.data)
        const result = util.formatMessages(response.data)
        res.render("home", {messages: result})
      }).catch(error => {
        console.error('error: ' + error)
    })
});

//버튼눌러서 백엔드에 제출할 떄 쓰는 것
router.post('/post', (req, res) => {
  console.log(`received request: ${req.method} ${req.url}`)

  // 응답 검증할때
  const title = req.body.title
  const message = req.body.message
  const slength = req.body.slength
  const image = req.body.image
  const mp3 = req.body.mp3
  const tracknum = req.body.tracknum
  const views = req.body.views
  if (!title || title.length == 0) {
    res.status(400).send("title is not specified")
    return
  }

  if (!message || message.length == 0) {
    res.status(400).send("message is not specified")
    return
  }
  
  if (!slength || slength.length == 0) {
    res.status(400).send("slength is not specified")
    return
  }

  if (!image || image.length == 0) {
    res.status(400).send("image is not specified")
    return
  }
  // 백엔드에 보내고 홈페이지로 리다이렉트
  console.log(`posting to ${BACKEND_URI}- name: ${title} artist: ${message} slength: ${slength} image: ${image} mp3: ${mp3} tracknum: ${tracknum} views: ${views}`)
  axios.post(BACKEND_URI, {
    title: title,
    artist: message,
    slength: slength,
    image:image,
    mp3:mp3,
    tracknum:tracknum
  }).then(response => {
      console.log(`response from ${BACKEND_URI}` + response.status)
      res.redirect('/')
  }).catch(error => {
      console.error('error: ' + error)
  })
});
