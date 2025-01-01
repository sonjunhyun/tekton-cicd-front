const express = require('express');
const bodyParser = require('body-parser');
const Message = require('./messages')

const router = express.Router();
router.use(bodyParser.json());

// /messages에 GET 조정하기
router.get('/messages', (req, res) => {
    console.log(`received request: ${req.method} ${req.url}`)

    // 정렬관련 함수(시간값순으로 id생성하고, 정렬)
    try {
        Message.messageModel.find({}, null, { sort: { '_id': -1 } }, (err, messages) => {
            let list = []
            if (messages.length > 0) {
                messages.forEach((message) => {
                    if (message.title && message.artist && message.slength && message.image && message.mp3 && message.tracknum && message.views) {
                        list.push({ 'title': message.title, 'artist': message.artist, 'slength': message.slength, 'image':message.image, 'mp3':message.mp3, 'tracknum':message.tracknum, 'views':message.views})
                    }
                });
            }
            res.status(200).json(list)
        });
    } catch (error) {
        res.status(500).json(error)
    }
});

// /messages에 POST 조정하기
router.post('/messages', (req, res) => {
    try {
        Message.create(({title: req.body.title, artist: req.body.artist, slength: req.body.slength, image:req.body.image, mp3:req.body.mp3, tracknum:req.body.tracknum, views:req.body.views}))
        res.status(200).send()
    } catch (err) {
        if (err.name == "ValidationError") {
            console.error('validation error: ' + err)
            res.status(400).json(err)
        } else {
            console.error('could not save: ' + err)
            res.status(500).json(err)
        }
    }
});

module.exports = router;
