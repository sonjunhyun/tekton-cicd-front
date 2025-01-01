const moment = require('moment')
//시간과니 위한 라이브러리 불러옴

//주어진 시간과 현재시간의 차이 계산해서 사람이 읽기쉽게 반환
const timeAgo = (utcTime, currTime) => {
    const past = moment(utcTime)
    const result = past.from(moment(currTime))
    return result
}

//메시지 목록의 각 항목에 timeago값 추가
const formatMessages = (messages) => {
    const currTime = moment.now()
    messages.forEach(message => {
        message.timeAgo= timeAgo(message.timestamp, currTime)
    });
    return messages
    
}

module.exports = {
    timeAgo: timeAgo,
    formatMessages: formatMessages
}
